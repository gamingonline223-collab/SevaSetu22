import { Issue, Analytics } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateUniqueId = (): string => {
  return 'id-' + Math.random().toString(36).substr(2, 9);
};

export const isEmailValid = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'open':
      return '#f59e0b'; // amber
    case 'in-progress':
      return '#3b82f6'; // blue
    case 'resolved':
      return '#10b981'; // green
    case 'closed':
      return '#6b7280'; // gray
    default:
      return '#6b7280';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'urgent':
      return '#ef4444'; // red
    case 'high':
      return '#f97316'; // orange
    case 'medium':
      return '#eab308'; // yellow
    case 'low':
      return '#22c55e'; // green
    default:
      return '#6b7280';
  }
};

export const calculateAnalytics = (issues: Issue[]): Analytics => {
  const analytics: Analytics = {
    totalIssues: issues.length,
    openIssues: 0,
    inProgressIssues: 0,
    resolvedIssues: 0,
    closedIssues: 0,
    issuesByCategory: {},
    issuesByPriority: {}
  };

  issues.forEach(issue => {
    // Count by status
    switch (issue.status) {
      case 'open':
        analytics.openIssues++;
        break;
      case 'in-progress':
        analytics.inProgressIssues++;
        break;
      case 'resolved':
        analytics.resolvedIssues++;
        break;
      case 'closed':
        analytics.closedIssues++;
        break;
    }

    // Count by category
    analytics.issuesByCategory[issue.category] = 
      (analytics.issuesByCategory[issue.category] || 0) + 1;

    // Count by priority
    analytics.issuesByPriority[issue.priority] = 
      (analytics.issuesByPriority[issue.priority] || 0) + 1;
  });

  return analytics;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};