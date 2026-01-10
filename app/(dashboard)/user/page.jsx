'use client';

import { useState } from 'react';

export default function UserDashboard() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMode, setReportMode] = useState('photo'); // 'photo' or 'report'
  const [showNearbyIssues, setShowNearbyIssues] = useState(false);
  const [showMyReports, setShowMyReports] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    description: '',
    photo: null,
  });

  const recentReports = [
    {
      id: 'REP-001',
      title: 'Pothole on Main Street',
      location: '12th Main Rd, Ward 42',
      ward: 'Ward 42',
      status: 'pending',
      createdAt: '2 hours ago',
      description: 'Large pothole causing traffic congestion',
      distance: '0.5 km',
    },
    {
      id: 'REP-002',
      title: 'Garbage Accumulation',
      location: 'CMH Road, Ward 42',
      ward: 'Ward 42',
      status: 'in-progress',
      createdAt: '1 day ago',
      description: 'Garbage pile near the community center',
      distance: '1.2 km',
    },
    {
      id: 'REP-003',
      title: 'Street Light Not Working',
      location: 'Indiranagar Layout, Ward 42',
      ward: 'Ward 42',
      status: 'resolved',
      createdAt: '3 days ago',
      description: 'Street light repaired successfully',
      distance: '0.8 km',
    },
  ];

  // Nearby issues (same ward as user - Ward 42)
  const nearbyIssues = recentReports.filter(report => report.ward === 'Ward 42').sort((a, b) => {
    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    return distA - distB;
  });

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-neutral-100 text-neutral-700', icon: 'schedule' },
    'in-progress': { label: 'In Progress', color: 'bg-warning-100 text-warning-700', icon: 'build' },
    resolved: { label: 'Resolved', color: 'bg-success-100 text-success-700', icon: 'check_circle' },
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file.name });
    }
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    console.log('Report submitted:', formData);
    setShowReportModal(false);
    setFormData({ category: '', location: '', description: '', photo: null });
  };

  return (
    <div className="pt-lg pb-24 md:pb-lg px-md md:px-lg bg-neutral-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-sm flex items-center gap-md">
            Hello, User <span className="text-3xl">👋</span>
          </h1>
          <p className="text-neutral-600 flex items-center gap-sm">
            <span className="material-icons text-lg">location_on</span>
            Ward 42 · Indiranagar
          </p>
        </div>

        {/* Report New Issue CTA - Widened */}
        <div className="grid md:grid-cols-2 gap-lg mb-2xl">
          <button
            onClick={() => {
              setReportMode('photo');
              setShowReportModal(true);
            }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg p-2xl md:p-3xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center group text-center"
          >
            <span className="material-icons text-6xl md:text-7xl text-orange-200 group-hover:text-orange-100 transition-colors mb-md">camera_alt</span>
            <p className="text-lg md:text-xl font-bold">Take a Photo</p>
            <p className="text-sm text-orange-100 mt-sm">Snap and report instantly</p>
          </button>

          <button
            onClick={() => {
              setReportMode('report');
              setShowReportModal(true);
            }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg p-2xl md:p-3xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center group text-center"
          >
            <span className="material-icons text-6xl md:text-7xl text-primary-200 group-hover:text-primary-100 transition-colors mb-md">edit_note</span>
            <p className="text-lg md:text-xl font-bold">Write Report</p>
            <p className="text-sm text-primary-100 mt-sm">Describe in detail</p>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-md mb-2xl">
          <button
            onClick={() => setShowNearbyIssues(true)}
            className="bg-white rounded-lg p-lg border border-neutral-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-primary-300"
          >
            <span className="material-icons text-2xl text-primary-700 mb-sm block">place</span>
            <p className="font-semibold text-neutral-800 text-sm">View Nearby Issues</p>
            <p className="text-xs text-neutral-500 mt-sm">See community reports</p>
          </button>

          <button
            onClick={() => setShowMyReports(true)}
            className="bg-white rounded-lg p-lg border border-neutral-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-primary-300"
          >
            <span className="material-icons text-2xl text-primary-700 mb-sm block">assignment</span>
            <p className="font-semibold text-neutral-800 text-sm">My Reports</p>
            <p className="text-xs text-neutral-500 mt-sm">Track your submissions</p>
          </button>
        </div>

        {/* Recent Reports Section */}
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-md flex items-center gap-sm">
            <span className="material-icons">history</span>
            Recent Reports
          </h2>

          <div className="space-y-md">
            {recentReports.map((report) => {
              const status = statusConfig[report.status];
              return (
                <div key={report.id} className="bg-white rounded-lg p-lg border border-neutral-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-md mb-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-sm mb-sm">
                        <h3 className="font-bold text-neutral-800">{report.title}</h3>
                        <span className={`inline-flex items-center gap-xs px-2 py-1 rounded text-xs font-semibold ${status.color}`}>
                          <span className="material-icons text-sm">{status.icon}</span>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-sm">{report.description}</p>
                      <p className="text-xs text-neutral-500 flex items-center gap-sm">
                        <span className="material-icons text-sm">location_on</span>
                        {report.location}
                      </p>
                    </div>
                  </div>
                  <div className="pt-md border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-neutral-500 flex items-center gap-sm">
                        <span className="material-icons text-sm">access_time</span>
                        {report.createdAt}
                      </p>
                      <button 
                        onClick={() => setSelectedReport(report)}
                        className="text-sm font-semibold text-primary-700 hover:text-primary-800 flex items-center gap-sm"
                      >
                        View Details
                        <span className="material-icons text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Report Issue Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-md z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-lg py-md flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-800">
                {reportMode === 'photo' ? 'Take a Photo' : 'Write a Report'}
              </h2>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitReport} className="p-lg space-y-lg">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-neutral-800 mb-sm">Category</label>
                <select
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full px-md py-md border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-200 transition-all bg-white"
                >
                  <option value="">Select a category...</option>
                  <option value="pothole">Pothole</option>
                  <option value="garbage">Garbage Dump</option>
                  <option value="street-light">Street Light</option>
                  <option value="water">Water Leakage</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-neutral-800 mb-sm">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., CMH Road, Ward 42"
                  className="w-full px-md py-md border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-neutral-800 mb-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the issue in detail..."
                  rows={5}
                  className="w-full px-md py-md border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
                />
              </div>

              {/* Photo Upload - Only show for 'photo' mode */}
              {reportMode === 'photo' && (
                <div>
                  <label className="block text-sm font-bold text-neutral-800 mb-sm">Photo</label>
                  <label className="border-2 border-dashed border-neutral-300 hover:border-primary-500 transition-colors rounded-lg p-lg flex flex-col items-center justify-center cursor-pointer bg-neutral-50 hover:bg-primary-50">
                    <span className="material-icons text-4xl text-neutral-400 mb-sm">camera_alt</span>
                    <p className="text-sm font-semibold text-neutral-700 text-center">
                      {formData.photo ? formData.photo : 'Take or upload a photo'}
                    </p>
                    <p className="text-xs text-neutral-500 mt-sm">Click to select or drag & drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-700 hover:bg-primary-800 text-white font-bold py-md rounded-lg transition-colors mt-lg"
              >
                Submit Issue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Nearby Issues Modal */}
      {showNearbyIssues && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-md z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-lg py-md flex items-center justify-between">
              <div className="flex items-center gap-md">
                <span className="material-icons text-2xl text-primary-700">place</span>
                <h3 className="text-xl font-bold text-neutral-800">Nearby Issues</h3>
              </div>
              <button
                onClick={() => setShowNearbyIssues(false)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-lg">
              <p className="text-sm text-neutral-600 mb-lg flex items-center gap-sm">
                <span className="material-icons text-sm">location_on</span>
                Issues reported in Ward 42 · Indiranagar
              </p>

              {nearbyIssues.length > 0 ? (
                <div className="space-y-md">
                  {nearbyIssues.map((issue) => {
                    const status = statusConfig[issue.status];
                    return (
                      <div key={issue.id} className="bg-neutral-50 rounded-lg p-lg border border-neutral-200 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between gap-md mb-md">
                          <div className="flex-1">
                            <div className="flex items-center gap-sm mb-sm">
                              <h3 className="font-bold text-neutral-800">{issue.title}</h3>
                              <span className={`inline-flex items-center gap-xs px-2 py-1 rounded text-xs font-semibold ${status.color}`}>
                                <span className="material-icons text-sm">{status.icon}</span>
                                {status.label}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-600 mb-sm">{issue.description}</p>
                            <p className="text-xs text-neutral-500 flex items-center gap-sm mb-sm">
                              <span className="material-icons text-sm">location_on</span>
                              {issue.location}
                            </p>
                            <p className="text-xs text-primary-700 font-semibold flex items-center gap-sm">
                              <span className="material-icons text-sm">straighten</span>
                              {issue.distance} away
                            </p>
                          </div>
                        </div>
                        <div className="pt-md border-t border-neutral-200 flex items-center justify-between">
                          <p className="text-xs text-neutral-500 flex items-center gap-sm">
                            <span className="material-icons text-sm">access_time</span>
                            {issue.createdAt}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-lg">
                  <span className="material-icons text-5xl text-neutral-300 mb-md block">place</span>
                  <p className="text-neutral-600 font-semibold">No nearby issues reported</p>
                  <p className="text-xs text-neutral-500 mt-sm">Great! Your area is clean</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* My Reports Modal */}
      {showMyReports && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-md z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-lg py-md flex items-center justify-between">
              <div className="flex items-center gap-md">
                <span className="material-icons text-2xl text-primary-700">assignment</span>
                <h3 className="text-xl font-bold text-neutral-800">My Reports</h3>
              </div>
              <button
                onClick={() => setShowMyReports(false)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-lg">
              <p className="text-sm text-neutral-600 mb-lg">
                Total: <span className="font-bold text-neutral-800">{recentReports.length} reports</span>
              </p>

              {recentReports.length > 0 ? (
                <div className="space-y-md">
                  {recentReports.map((report) => {
                    const status = statusConfig[report.status];
                    return (
                      <div key={report.id} className="bg-neutral-50 rounded-lg p-lg border border-neutral-200 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between gap-md mb-md">
                          <div className="flex-1">
                            <div className="flex items-center gap-sm mb-sm">
                              <h3 className="font-bold text-neutral-800">{report.title}</h3>
                              <span className={`inline-flex items-center gap-xs px-2 py-1 rounded text-xs font-semibold ${status.color}`}>
                                <span className="material-icons text-sm">{status.icon}</span>
                                {status.label}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-600 mb-sm">{report.description}</p>
                            <p className="text-xs text-neutral-500 flex items-center gap-sm">
                              <span className="material-icons text-sm">location_on</span>
                              {report.location}
                            </p>
                          </div>
                        </div>
                        <div className="pt-md border-t border-neutral-200 flex items-center justify-between">
                          <p className="text-xs text-neutral-500 flex items-center gap-sm">
                            <span className="material-icons text-sm">access_time</span>
                            {report.createdAt}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-lg">
                  <span className="material-icons text-5xl text-neutral-300 mb-md block">assignment</span>
                  <p className="text-neutral-600 font-semibold">No reports yet</p>
                  <p className="text-xs text-neutral-500 mt-sm">Submit your first report to help your community</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-md z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-lg py-md flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-800">{selectedReport.title}</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-lg space-y-lg">
              {/* Status */}
              <div>
                <p className="text-xs font-bold text-neutral-500 mb-sm">STATUS</p>
                <span className={`inline-flex items-center gap-sm px-md py-sm rounded text-sm font-bold text-white ${statusConfig[selectedReport.status].color}`}>
                  <span className="material-icons text-sm">{statusConfig[selectedReport.status].icon}</span>
                  {statusConfig[selectedReport.status].label}
                </span>
              </div>

              {/* Location & Ward */}
              <div className="grid grid-cols-2 gap-lg">
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">LOCATION</p>
                  <p className="text-base font-semibold text-neutral-800">{selectedReport.location}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">WARD</p>
                  <p className="text-base font-semibold text-neutral-800">{selectedReport.ward}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-bold text-neutral-500 mb-sm">DESCRIPTION</p>
                <p className="text-base text-neutral-700 leading-relaxed">{selectedReport.description}</p>
              </div>

              {/* Distance & Time */}
              <div className="grid grid-cols-2 gap-lg bg-neutral-50 p-lg rounded-lg border border-neutral-200">
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">DISTANCE</p>
                  <p className="text-base font-semibold text-neutral-800 flex items-center gap-sm">
                    <span className="material-icons text-sm">straighten</span>
                    {selectedReport.distance}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-500 mb-sm">REPORTED</p>
                  <p className="text-base font-semibold text-neutral-800 flex items-center gap-sm">
                    <span className="material-icons text-sm">access_time</span>
                    {selectedReport.createdAt}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-lg border-t border-neutral-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="w-full px-md py-md bg-primary-700 text-white rounded-md font-semibold hover:bg-primary-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
