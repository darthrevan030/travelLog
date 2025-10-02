import { useEffect, useState } from 'react';
import '../styles.css';

export default function Sidebar({ log, onClose }){
  const [isClosing, setIsClosing] = useState(false);
  const [currentLog, setCurrentLog] = useState(false);
  
  useEffect(() => {
    if (log) {
      setCurrentLog(log);
      setIsClosing(false);
    }
  }, [log]);

  useEffect(() => {
    if (!log && currentLog && !isClosing){
      handleClose();
    }
  });

  if (!currentLog) return null;

  // Helper variables (calculate once, use multiple times)
  const formattedVisitDate = new Date(log.visitDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric'
  });

    const formattedCreatedDate = new Date(log.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric'
  });

      const formattedUpdatedDate = new Date(log.updatedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric'
  });

  const starRating = '⭐'.repeat(Math.round(log.rating / 2));

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setCurrentLog(null);
    }, 500);
  }

  return (
      <div className={`sidebar ${isClosing ? 'closing' : '' }`}>
          <button className='close-button' onClick={handleClose}>X</button>
          <h1 style={{textAlign:'center', }}>{log.title}</h1>
          <p>by {log.author}</p>
          <p>Visited On {formattedVisitDate}</p>
          <p>{starRating} {log.rating}/10</p>
          <p>Created at: {formattedCreatedDate}</p>
          <p>Updated at: {formattedUpdatedDate}</p>
          <img src={log.image} alt=""></img>
          <h2>Description</h2>
          <p>{log.description}</p>
          <h2>Comments</h2>
          <p>{log.comments}</p>

      </div>
  );
}
