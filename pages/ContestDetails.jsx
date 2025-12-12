import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../store';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Clock, DollarSign, Trophy, User, CheckCircle, AlertCircle } from 'lucide-react';
import { UserRole } from '../script';

export const ContestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { contests, currentUser, submissions, joinContest, submitTask, users } = useApp();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const contest = contests.find(c => c.id === id);
  const userSubmission = submissions.find(s => s.contestId === id && s.userId === currentUser?.id);
  const isRegistered = !!userSubmission;
  const isDeadlinePassed = contest ? new Date(contest.deadline).getTime() < Date.now() : true;
  const winner = contest?.winnerId ? users.find(u => u.id === contest.winnerId) : null;

  const { register, handleSubmit, reset } = useForm<{ taskUrl: string }>();

  if (!contest) return <div className="p-10 text-center">Contest not found</div>;

  const handleRegister = async () => {
    if (!currentUser) return;
    
    // Simulate Payment
    const result = await Swal.fire({
      title: `Pay $${contest.price}?`,
      text: "Secure payment gateway simulation.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Pay Now',
      confirmButtonColor: '#7c3aed'
    });

    if (result.isConfirmed) {
      await joinContest(contest.id, {});
      Swal.fire('Success', 'Payment Successful! You can now submit your task.', 'success');
    }
  };

  const onTaskSubmit = async (data: { taskUrl: string }) => {
    await submitTask(contest.id, data.taskUrl);
    setIsSubmitModalOpen(false);
    reset();
    Swal.fire('Submitted!', 'Your task has been received.', 'success');
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <img src={contest.image} alt={contest.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center px-4 shadow-black drop-shadow-lg">{contest.title}</h1>
            </div>
        </div>

        <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Col: Details */}
                <div className="md:w-2/3 space-y-8">
                    {/* Status & Winner */}
                    {contest.winnerId && winner && (
                         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-center space-x-4 animate-pulse">
                            <img src={winner.photoUrl} className="w-16 h-16 rounded-full border-2 border-yellow-500" />
                            <div>
                                <h3 className="text-lg font-bold text-yellow-800">Winner Declared!</h3>
                                <p className="text-yellow-700">Congratulations to <span className="font-bold">{winner.name}</span> for winning ${contest.prizeMoney}!</p>
                            </div>
                            <Trophy className="ml-auto text-yellow-500 h-10 w-10" />
                         </div>
                    )}

                    <section>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Description</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{contest.description}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Task Instructions</h2>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border-l-4 border-primary-500">
                             <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{contest.instruction}</p>
                        </div>
                    </section>
                </div>

                {/* Right Col: Actions */}
                <div className="md:w-1/3">
                    <div className="sticky top-24 bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-700 dark:text-gray-200">
                                <Trophy className="mr-2 text-yellow-500" />
                                <span className="font-bold">Prize</span>
                            </div>
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">${contest.prizeMoney}</span>
                         </div>
                         
                         <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-700 dark:text-gray-200">
                                <DollarSign className="mr-2 text-gray-400" />
                                <span className="font-bold">Entry Fee</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">${contest.price}</span>
                         </div>

                         <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-700 dark:text-gray-200">
                                <User className="mr-2 text-blue-500" />
                                <span className="font-bold">Participants</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{contest.participantsCount}</span>
                         </div>

                         <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-700 dark:text-gray-200">
                                <Clock className="mr-2 text-red-500" />
                                <span className="font-bold">Deadline</span>
                            </div>
                            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                                {isDeadlinePassed ? "Ended" : new Date(contest.deadline).toLocaleDateString()}
                            </span>
                         </div>

                         <hr className="border-gray-200 dark:border-gray-600" />

                         {/* Action Buttons */}
                         {!currentUser ? (
                             <Link to="/login" className="block w-full py-3 bg-primary-600 text-white text-center rounded-lg font-bold hover:bg-primary-700">Login to Join</Link>
                         ) : (
                             <>
                                {currentUser.role === UserRole.USER && (
                                    <>
                                        {!isRegistered && !isDeadlinePassed && (
                                            <button onClick={handleRegister} className="w-full py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition">
                                                Register Now
                                            </button>
                                        )}
                                        
                                        {isRegistered && !isDeadlinePassed && (
                                            <div className="space-y-3">
                                                <div className="flex items-center text-green-600 justify-center font-bold">
                                                    <CheckCircle className="mr-2" /> Registered
                                                </div>
                                                <button onClick={() => setIsSubmitModalOpen(true)} className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition">
                                                    Submit Task
                                                </button>
                                            </div>
                                        )}

                                        {isDeadlinePassed && (
                                            <div className="w-full py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-bold text-center cursor-not-allowed">
                                                Contest Ended
                                            </div>
                                        )}
                                    </>
                                )}
                             </>
                         )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Submission Modal */}
      {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in-up">
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">Submit Your Task</h3>
                  <form onSubmit={handleSubmit(onTaskSubmit)}>
                      <div className="mb-4">
                          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Submission Link (Google Doc, GitHub, Dribbble, etc.)</label>
                          <textarea 
                             {...register('taskUrl', { required: true })}
                             className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white h-32"
                             placeholder="https://..."
                          ></textarea>
                      </div>
                      <div className="flex justify-end space-x-3">
                          <button type="button" onClick={() => setIsSubmitModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold">Submit</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};
