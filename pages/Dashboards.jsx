import React, { useState } from 'react';
import { useApp } from '../store';
import { useForm, Controller } from 'react-hook-form';
import { ContestCategory, ContestStatus, UserRole } from '../script';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { generateContestDescription } from '../services/geminiService';
import { Trash2, Edit, Check, X, Wand2 } from 'lucide-react';
import { SectionTitle } from '../components/ContestComponents';

// --- USER DASHBOARD ---
export const UserDashboard = () => {
  const { currentUser, contests, submissions, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: currentUser || {} });

  const mySubmissions = submissions.filter(s => s.userId === currentUser?.id);
  const participatedContests = contests
    .filter(c => mySubmissions.some(s => s.contestId === c.id))
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  
  const wonContests = contests.filter(c => c.winnerId === currentUser?.id);
  const winRate = mySubmissions.length > 0 ? (wonContests.length / mySubmissions.length) * 100 : 0;

  const chartData = [
    { name: 'Wins', value: wonContests.length },
    { name: 'Participation', value: mySubmissions.length - wonContests.length },
  ];
  const COLORS = ['#10B981', '#6366F1'];

  const handleUpdate = (data: any) => {
    updateProfile(data);
    setIsEditing(false);
    Swal.fire('Updated', 'Profile updated successfully', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle title={`Welcome, ${currentUser?.name}`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Profile Stats */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 lg:col-span-1">
           <div className="flex flex-col items-center">
              <img src={currentUser?.photoUrl} className="w-32 h-32 rounded-full border-4 border-primary-500 mb-4" />
              <h2 className="text-2xl font-bold dark:text-white">{currentUser?.name}</h2>
              <p className="text-gray-500 mb-4">{currentUser?.email}</p>
              
              {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200">Edit Profile</button>
              ) : (
                  <form onSubmit={handleSubmit(handleUpdate)} className="w-full space-y-2">
                     <input {...register('name')} className="w-full p-2 border rounded" placeholder="Name" />
                     <input {...register('photoUrl')} className="w-full p-2 border rounded" placeholder="Photo URL" />
                     <input {...register('address')} className="w-full p-2 border rounded" placeholder="Address" />
                     <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded">Save</button>
                  </form>
              )}
           </div>
           
           <div className="h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center text-sm text-gray-500">Win Rate: {winRate.toFixed(1)}%</div>
           </div>
        </div>

        {/* Participated Contests */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
           <h3 className="text-xl font-bold mb-6 dark:text-white">My Participated Contests</h3>
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                   <th className="pb-3">Title</th>
                   <th className="pb-3">Deadline</th>
                   <th className="pb-3">Status</th>
                   <th className="pb-3">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y dark:divide-gray-700">
                 {participatedContests.map(c => {
                    const isWinner = c.winnerId === currentUser?.id;
                    const isEnded = new Date(c.deadline).getTime() < Date.now();
                    return (
                        <tr key={c.id}>
                            <td className="py-4 dark:text-gray-200">{c.title}</td>
                            <td className="py-4 dark:text-gray-200">{new Date(c.deadline).toLocaleDateString()}</td>
                            <td className="py-4">
                                {isWinner ? <span className="text-green-500 font-bold">Won! 🏆</span> : 
                                 isEnded ? <span className="text-gray-500">Ended</span> : 
                                 <span className="text-blue-500">Active</span>}
                            </td>
                            <td className="py-4">
                                <a href={`#/contest/${c.id}`} className="text-primary-600 hover:underline">View</a>
                            </td>
                        </tr>
                    )
                 })}
               </tbody>
             </table>
             {participatedContests.length === 0 && <p className="text-center py-4 text-gray-500">You haven't joined any contests yet.</p>}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- CREATOR DASHBOARD ---
export const CreatorDashboard = () => {
  const { currentUser, contests, addContest, deleteContest, submissions, declareWinner } = useApp();
  const [activeTab, setActiveTab] = useState<'add' | 'my' | 'submissions'>('my');
  const [aiLoading, setAiLoading] = useState(false);
  
  const { register, handleSubmit, control, setValue, getValues, reset } = useForm();

  const myContests = contests.filter(c => c.creatorId === currentUser?.id);

  const handleAddContest = (data: any) => {
    addContest({
      ...data,
      creatorId: currentUser?.id || '',
      category: data.category as ContestCategory,
      prizeMoney: Number(data.prizeMoney),
      price: Number(data.price),
      deadline: data.deadline.toISOString()
    });
    Swal.fire('Success', 'Contest created successfully! Waiting for Admin approval.', 'success');
    reset();
    setActiveTab('my');
  };

  const handleAiGenerate = async () => {
    const title = getValues('title');
    const category = getValues('category');
    if (!title || !category) {
      Swal.fire('Error', 'Please enter Title and Category first', 'error');
      return;
    }
    setAiLoading(true);
    const desc = await generateContestDescription(title, category);
    setValue('description', desc);
    setAiLoading(false);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContest(id);
        Swal.fire('Deleted!', 'Your contest has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle title="Creator Dashboard" />
      
      <div className="flex space-x-4 mb-8 border-b dark:border-gray-700 pb-2">
        <button onClick={() => setActiveTab('add')} className={`pb-2 ${activeTab === 'add' ? 'border-b-2 border-primary-500 text-primary-600 font-bold' : 'text-gray-500'}`}>Add Contest</button>
        <button onClick={() => setActiveTab('my')} className={`pb-2 ${activeTab === 'my' ? 'border-b-2 border-primary-500 text-primary-600 font-bold' : 'text-gray-500'}`}>My Contests</button>
        <button onClick={() => setActiveTab('submissions')} className={`pb-2 ${activeTab === 'submissions' ? 'border-b-2 border-primary-500 text-primary-600 font-bold' : 'text-gray-500'}`}>Submissions</button>
      </div>

      {activeTab === 'add' && (
        <form onSubmit={handleSubmit(handleAddContest)} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-4">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Create New Contest</h3>
          
          <div><label className="block text-sm font-bold mb-1 dark:text-gray-300">Contest Name</label><input {...register('title', { required: true })} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" /></div>
          
          <div><label className="block text-sm font-bold mb-1 dark:text-gray-300">Image URL</label><input {...register('image', { required: true })} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" placeholder="https://..." /></div>
          
          <div><label className="block text-sm font-bold mb-1 dark:text-gray-300">Category</label>
            <select {...register('category', { required: true })} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white">
              {Object.values(ContestCategory).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-bold mb-1 dark:text-gray-300">Description</label>
            <textarea {...register('description', { required: true })} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white h-24"></textarea>
            <button type="button" onClick={handleAiGenerate} disabled={aiLoading} className="absolute right-2 bottom-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center hover:bg-purple-200">
               <Wand2 size={12} className="mr-1" /> {aiLoading ? 'Generating...' : 'AI Write'}
            </button>
          </div>

          <div><label className="block text-sm font-bold mb-1 dark:text-gray-300">Price ($)</label><input type="number" {...register('price', { required: true })} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" /></div>
          <div><label className="block text-sm font-bold mb-1 dark:text-gray-300">Prize Money ($)</label><input type="number" {...register('prizeMoney', { required: true })} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" /></div>
          <div><label className="block text-sm font-bold mb-1 dark:text-gray-300">Task Instruction</label><textarea {...register('instruction', { required: true })} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"></textarea></div>
          
          <div>
            <label className="block text-sm font-bold mb-1 dark:text-gray-300">Deadline</label>
            <Controller control={control} name="deadline" render={({ field }) => (
               <DatePicker selected={field.value} onChange={field.onChange} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" />
            )} />
          </div>

          <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700">Create Contest</button>
        </form>
      )}

      {activeTab === 'my' && (
         <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
           <table className="w-full">
             <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {myContests.map(c => (
                  <tr key={c.id}>
                    <td className="px-6 py-4 dark:text-white">{c.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${c.status === ContestStatus.CONFIRMED ? 'bg-green-100 text-green-800' : 
                          c.status === ContestStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 dark:text-white">{c.participantsCount}</td>
                    <td className="px-6 py-4">
                      {c.status === ContestStatus.PENDING && (
                         <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                      )}
                    </td>
                  </tr>
                ))}
             </tbody>
           </table>
         </div>
      )}

      {activeTab === 'submissions' && (
         <div className="grid gap-6">
            {myContests.map(c => {
               const subs = submissions.filter(s => s.contestId === c.id && s.taskUrl); // Only showed submitted tasks
               if(subs.length === 0) return null;
               
               return (
                 <div key={c.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-4 dark:text-white">{c.title} {c.winnerId && <span className="text-green-500 text-sm ml-2">(Winner Declared)</span>}</h4>
                    <ul className="space-y-4">
                       {subs.map(s => (
                         <li key={s.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded">
                            <span className="text-sm dark:text-gray-200">User ID: {s.userId} submitted <a href={s.taskUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">Link</a></span>
                            {!c.winnerId && (
                               <button onClick={() => { declareWinner(c.id, s.userId); Swal.fire('Winner Declared!', '', 'success'); }} className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                 Make Winner
                               </button>
                            )}
                         </li>
                       ))}
                    </ul>
                 </div>
               );
            })}
         </div>
      )}
    </div>
  );
};

// --- ADMIN DASHBOARD ---
export const AdminDashboard = () => {
  const { users, contests, updateUserRole, deleteContest, confirmContest, rejectContest } = useApp();
  const [activeTab, setActiveTab] = useState<'users' | 'contests'>('users');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle title="Admin Dashboard" />
      <div className="flex space-x-4 mb-8">
        <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}>Manage Users</button>
        <button onClick={() => setActiveTab('contests')} className={`px-4 py-2 rounded ${activeTab === 'contests' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}>Manage Contests</button>
      </div>

      {activeTab === 'users' ? (
         <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
             <thead className="bg-gray-50 dark:bg-gray-700">
               <tr>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
               </tr>
             </thead>
             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
               {users.map(u => (
                 <tr key={u.id}>
                   <td className="px-6 py-4 dark:text-white">{u.name}</td>
                   <td className="px-6 py-4 dark:text-white">{u.email}</td>
                   <td className="px-6 py-4 capitalize dark:text-white">{u.role}</td>
                   <td className="px-6 py-4">
                     <select 
                       value={u.role} 
                       onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                       className="border rounded p-1 text-sm dark:bg-gray-700 dark:text-white"
                     >
                        <option value={UserRole.USER}>User</option>
                        <option value={UserRole.CREATOR}>Creator</option>
                        <option value={UserRole.ADMIN}>Admin</option>
                     </select>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      ) : (
         <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
               <thead className="bg-gray-50 dark:bg-gray-700">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contest</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Creator</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                 {contests.map(c => (
                   <tr key={c.id}>
                      <td className="px-6 py-4 dark:text-white">{c.title}</td>
                      <td className="px-6 py-4 dark:text-white">{users.find(u => u.id === c.creatorId)?.name || 'Unknown'}</td>
                      <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${c.status === ContestStatus.CONFIRMED ? 'bg-green-100 text-green-800' : 
                              c.status === ContestStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {c.status}
                          </span>
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                         {c.status === ContestStatus.PENDING && (
                           <>
                             <button onClick={() => confirmContest(c.id)} className="bg-green-500 text-white p-1 rounded hover:bg-green-600" title="Approve"><Check size={16} /></button>
                             <button onClick={() => rejectContest(c.id)} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600" title="Reject"><X size={16} /></button>
                           </>
                         )}
                         <button onClick={() => deleteContest(c.id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600" title="Delete"><Trash2 size={16} /></button>
                      </td>
                   </tr>
                 ))}
               </tbody>
            </table>
         </div>
      )}
    </div>
  );
};