'use client';

import { useState } from 'react';

export default function WorkerDashboard() {
  const [jobStatus, setJobStatus] = useState('assigned');
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [completionNote, setCompletionNote] = useState('');
  const [completionPhoto, setCompletionPhoto] = useState(null);

  // Current assignment
  const currentAssignment = {
    id: 'TSK-001',
    title: 'Pothole Repair',
    category: 'Roads',
    department: 'Roads & Infrastructure',
    urgency: 'high',
    location: '12th Main Road, Ward 42',
    address: 'Near CMH Hospital, Indiranagar Layout',
    ward: 'Ward 42',
    description: 'Large pothole on main road causing traffic congestion and safety hazard. About 1.5 meters in diameter.',
    reportedBy: 'Rajesh Kumar',
    reportedTime: '2 hours ago',
    imageUrl: null,
    assignedTime: '1 hour ago',
    latitude: 12.9716,
    longitude: 77.5946,
  };

  const recentJobs = [
    {
      id: 'TSK-125',
      title: 'Street Light Installation',
      location: 'Indira Road, Ward 42',
      status: 'completed',
      completedTime: '2 days ago',
    },
    {
      id: 'TSK-124',
      title: 'Garbage Bin Placement',
      location: 'Market Area, Ward 42',
      status: 'completed',
      completedTime: '1 week ago',
    },
    {
      id: 'TSK-123',
      title: 'Water Pipeline Leak',
      location: '5th Cross Road, Ward 42',
      status: 'completed',
      completedTime: '2 weeks ago',
    },
  ];

  const urgencyConfig = {
    high: { label: 'Urgent', color: 'border-danger bg-danger/5', icon: 'priority_high', textColor: 'text-danger', borderColor: 'border-danger' },
    medium: { label: 'Medium', color: 'border-warning bg-warning/5', icon: 'info', textColor: 'text-warning', borderColor: 'border-warning' },
    low: { label: 'Low', color: 'border-success bg-success/5', icon: 'check_circle', textColor: 'text-success', borderColor: 'border-primary-600' },
  };

  const statusConfig = {
    assigned: { label: 'Assigned', icon: 'assignment', color: 'bg-neutral-100 text-neutral-700' },
    'on-way': { label: 'On the Way', icon: 'directions', color: 'bg-primary-100 text-primary-700' },
    'in-progress': { label: 'In Progress', icon: 'build', color: 'bg-warning-100 text-warning-700' },
    completed: { label: 'Completed', icon: 'check_circle', color: 'bg-success-100 text-success-700' },
  };

  const urgencyData = urgencyConfig[currentAssignment.urgency];

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'completed') {
      setShowCompletionForm(true);
    } else {
      setJobStatus(newStatus);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompletionPhoto(file.name);
    }
  };

  const handleCompleteJob = () => {
    console.log('Job completed:', { note: completionNote, photo: completionPhoto });
    setJobStatus('completed');
    setShowCompletionForm(false);
    setCompletionNote('');
    setCompletionPhoto(null);
  };

  return (
    <div className="pt-lg pb-24 md:pb-lg px-md md:px-lg bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-sm flex items-center gap-md">
            Hello, Worker 👋
          </h1>
          <p className="text-neutral-600 flex items-center gap-sm mb-sm">
            <span className="material-icons text-lg">business</span>
            {currentAssignment.department}
          </p>
          <p className="text-neutral-600 flex items-center gap-sm">
            <span className="material-icons text-lg">location_on</span>
            {currentAssignment.ward}
          </p>
        </div>

        {/* COMBINED ASSIGNMENT ALERT & DETAILS CARD */}
        <div className={`border-2 rounded-lg p-lg md:p-2xl mb-2xl shadow-md bg-neutral-100 ${urgencyData.borderColor}`}>
          {/* Assignment Header */}
          <div className="flex items-start gap-md md:gap-lg mb-lg pb-lg border-b border-neutral-300">
            <span className={`material-icons text-4xl ${urgencyData.textColor} flex-shrink-0`}>
              {urgencyData.icon}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-sm mb-md">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
                  {currentAssignment.title}
                </h2>
                <span className={`inline-flex items-center gap-xs px-3 py-1 rounded-full text-sm font-bold ${urgencyData.textColor}`}>
                  {urgencyData.label}
                </span>
              </div>
              <p className="text-neutral-700 font-semibold mb-md">{currentAssignment.category}</p>
              <p className="text-neutral-600 flex items-center gap-sm mb-md">
                <span className="material-icons text-lg">location_on</span>
                {currentAssignment.location}
              </p>
              <p className="text-sm text-neutral-500 flex items-center gap-sm">
                <span className="material-icons text-lg">access_time</span>
                Assigned {currentAssignment.assignedTime}
              </p>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="mb-lg pb-lg border-b border-neutral-300">
            <h3 className="text-lg font-bold text-neutral-800 mb-md flex items-center gap-sm">
              <span className="material-icons">info</span>
              Job Details
            </h3>

            <div className="space-y-md">
              {/* Description */}
              <div>
                <p className="text-sm font-semibold text-neutral-600 mb-sm">DESCRIPTION</p>
                <p className="text-neutral-800 leading-relaxed">{currentAssignment.description}</p>
              </div>

              {/* Reported Info */}
              <div className="grid grid-cols-2 gap-md pt-md border-t border-neutral-300">
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">REPORTED BY</p>
                  <p className="text-neutral-800 font-semibold">{currentAssignment.reportedBy}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">REPORTED TIME</p>
                  <p className="text-neutral-800 font-semibold">{currentAssignment.reportedTime}</p>
                </div>
              </div>

              {/* Image Preview */}
              {currentAssignment.imageUrl ? (
                <div className="pt-md border-t border-neutral-300">
                  <p className="text-xs font-bold text-neutral-500 mb-sm">ISSUE IMAGE</p>
                  <img
                    src={currentAssignment.imageUrl}
                    alt="Issue"
                    className="w-full rounded-lg border border-neutral-300 cursor-pointer hover:shadow-md transition-shadow"
                  />
                </div>
              ) : (
                <div className="pt-md border-t border-neutral-300">
                  <p className="text-xs font-bold text-neutral-500 mb-sm">ISSUE IMAGE</p>
                  <div className="bg-white rounded-lg border-2 border-dashed border-neutral-300 h-32 flex items-center justify-center">
                    <div className="text-center">
                      <span className="material-icons text-4xl text-neutral-400 mb-sm block">image_not_supported</span>
                      <p className="text-sm text-neutral-500">No image provided</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-lg pb-lg border-b border-neutral-300">
            <h3 className="text-lg font-bold text-neutral-800 mb-md flex items-center gap-sm">
              <span className="material-icons">map</span>
              Location
            </h3>

            <div className="space-y-md">
              <div>
                <p className="text-sm font-semibold text-neutral-600 mb-sm">ADDRESS</p>
                <p className="text-neutral-800">{currentAssignment.address}</p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg border border-neutral-300 h-40 flex items-center justify-center">
                <div className="text-center">
                  <span className="material-icons text-5xl text-neutral-400 mb-sm block">location_on</span>
                  <p className="text-sm text-neutral-500">Mini map placeholder</p>
                </div>
              </div>

              {/* Open Maps Button */}
              <button className="w-full bg-primary-700 hover:bg-primary-800 text-white font-bold py-md rounded-lg transition-colors flex items-center justify-center gap-sm">
                <span className="material-icons">directions</span>
                Open in Google Maps
              </button>
            </div>
          </div>

          {/* Job Status Update Section */}
          <div>
            <h3 className="text-lg font-bold text-neutral-800 mb-md flex items-center gap-sm">
              <span className="material-icons">update</span>
              Update Status
            </h3>

            <div className="space-y-md">
              {/* Current Status */}
              <div>
                <p className="text-sm font-semibold text-neutral-600 mb-md">CURRENT STATUS</p>
                <div className="flex items-center gap-sm p-md bg-white rounded-lg">
                  <span className="material-icons text-2xl text-neutral-700">
                    {statusConfig[jobStatus].icon}
                  </span>
                  <p className="font-semibold text-neutral-800">{statusConfig[jobStatus].label}</p>
                </div>
              </div>

              {/* Status Buttons */}
              <div className="grid grid-cols-2 gap-md pt-md border-t border-neutral-300">
                {jobStatus !== 'on-way' && (
                  <button
                    onClick={() => handleStatusChange('on-way')}
                    className="bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold py-md px-lg rounded-lg transition-colors flex items-center justify-center gap-sm"
                  >
                    <span className="material-icons">directions</span>
                    On the Way
                  </button>
                )}
                {jobStatus !== 'in-progress' && (
                  <button
                    onClick={() => handleStatusChange('in-progress')}
                    className="bg-warning-100 hover:bg-warning-200 text-warning-700 font-bold py-md px-lg rounded-lg transition-colors flex items-center justify-center gap-sm"
                  >
                    <span className="material-icons">build</span>
                    In Progress
                  </button>
                )}
                {jobStatus !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className="col-span-2 bg-success-600 hover:bg-success-700 text-white font-bold py-md px-lg rounded-lg transition-colors flex items-center justify-center gap-sm"
                  >
                    <span className="material-icons">check_circle</span>
                    Mark Complete
                  </button>
                )}
              </div>

              {/* Navigate Button */}
              <div className="pt-md border-t border-neutral-300">
                <button className="w-full bg-primary-700 hover:bg-primary-800 text-white font-bold py-md px-lg rounded-lg transition-colors flex items-center justify-center gap-sm">
                  <span className="material-icons">directions</span>
                  Navigate to Location
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs */}
        <div>
          <h3 className="text-lg font-bold text-neutral-800 mb-md flex items-center gap-sm">
            <span className="material-icons">history</span>
            Recent Jobs
          </h3>

          <div className="space-y-md">
            {recentJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg border border-neutral-200 shadow-sm p-md hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-md">
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-800">{job.title}</p>
                    <p className="text-sm text-neutral-600 flex items-center gap-sm mt-sm">
                      <span className="material-icons text-lg">location_on</span>
                      {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-xs px-2 py-1 bg-success-100 text-success-700 rounded font-bold text-xs">
                    <span className="material-icons text-sm">check_circle</span>
                    Completed
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-md flex items-center gap-sm">
                  <span className="material-icons text-sm">access_time</span>
                  {job.completedTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Form Modal */}
      {showCompletionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-md z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-lg py-md flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-800">Complete Job</h3>
              <button
                onClick={() => setShowCompletionForm(false)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-lg space-y-lg">
              {/* Completion Note */}
              <div>
                <label className="block text-sm font-bold text-neutral-800 mb-sm">Completion Note (Optional)</label>
                <textarea
                  value={completionNote}
                  onChange={(e) => setCompletionNote(e.target.value)}
                  placeholder="Describe what was done, any issues encountered, etc..."
                  rows={4}
                  className="w-full px-md py-md border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
                />
              </div>

              {/* After Fix Photo */}
              <div>
                <label className="block text-sm font-bold text-neutral-800 mb-sm">After-Fix Photo (Optional)</label>
                <label className="border-2 border-dashed border-neutral-300 hover:border-primary-500 transition-colors rounded-lg p-lg flex flex-col items-center justify-center cursor-pointer bg-neutral-50 hover:bg-primary-50">
                  <span className="material-icons text-4xl text-neutral-400 mb-sm">camera_alt</span>
                  <p className="text-sm font-semibold text-neutral-700 text-center">
                    {completionPhoto ? completionPhoto : 'Take or upload photo'}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleCompleteJob}
                className="w-full bg-success-600 hover:bg-success-700 text-white font-bold py-md rounded-lg transition-colors mt-lg"
              >
                Submit Completion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
