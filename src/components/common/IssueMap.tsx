import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { Issue } from '../../types';

interface IssueMapProps {
  issues?: Issue[];
  issue?: Issue;
  height?: string;
  zoom?: number;
  center?: { lat: number; lng: number };
}

const IssueMap: React.FC<IssueMapProps> = ({ 
  issues, 
  issue, 
  height = '400px', 
  zoom = 13,
  center 
}) => {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

  // Determine the center of the map
  const getMapCenter = () => {
    if (center) return center;
    if (issue?.coordinates) {
      return { lat: issue.coordinates.latitude, lng: issue.coordinates.longitude };
    }
    if (issues && issues.length > 0) {
      const firstWithCoords = issues.find(i => i.coordinates);
      if (firstWithCoords?.coordinates) {
        return { lat: firstWithCoords.coordinates.latitude, lng: firstWithCoords.coordinates.longitude };
      }
    }
    // Default center (Kolkata based on screenshot)
    return { lat: 22.5726, lng: 88.3639 };
  };

  const containerStyle = {
    width: '100%',
    height: height
  };

  const mapCenter = getMapCenter();

  if (!apiKey) {
    return (
      <div style={{ 
        width: '100%', 
        height: height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f3f4f6',
        borderRadius: '8px',
        color: '#6b7280',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div>
          <p style={{ margin: 0, fontWeight: 600 }}>Google Maps API Key Required</p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
            Add REACT_APP_GOOGLE_MAPS_API_KEY to your .env file
          </p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} loadingElement={<div>Loading...</div>}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
      >
        {/* Single issue marker */}
        {issue?.coordinates && (
          <MarkerF
            position={{ 
              lat: Number(issue.coordinates.latitude), 
              lng: Number(issue.coordinates.longitude) 
            }}
            onClick={() => setSelectedIssue(issue)}
          />
        )}

        {/* Multiple issues markers */}
        {issues?.map((issueItem) => {
          if (!issueItem.coordinates) return null;
          return (
            <MarkerF
              key={issueItem.id}
              position={{ 
                lat: Number(issueItem.coordinates.latitude), 
                lng: Number(issueItem.coordinates.longitude) 
              }}
              onClick={() => setSelectedIssue(issueItem)}
            />
          );
        })}

        {/* Info Window for selected marker */}
        {selectedIssue?.coordinates && (
          <InfoWindow
            position={{ 
              lat: Number(selectedIssue.coordinates.latitude), 
              lng: Number(selectedIssue.coordinates.longitude) 
            }}
            onCloseClick={() => setSelectedIssue(null)}
          >
            <div style={{ maxWidth: '200px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>
                {selectedIssue.title}
              </h4>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#6b7280' }}>
                {selectedIssue.category}
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>
                <strong>Priority:</strong> {selectedIssue.priority}
              </p>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
                <strong>Status:</strong> {selectedIssue.status}
              </p>
              {selectedIssue.address && (
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
                  {selectedIssue.address}
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default IssueMap;