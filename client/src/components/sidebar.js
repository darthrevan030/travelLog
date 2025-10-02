import '../styles.css';

export default function Sidebar({ log, onClose }){
  if (!log) return null;

  // Helper variables (calculate once, use multiple times)
  const formattedDate = new Date(log.visitDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric'
  });

  const starRating = '⭐'.repeat(Math.round(log.rating / 2));

  return (
      <div className="sidebar">
          <button className='close-button' onClick={onClose}>x</button>
          <h1 style={{textAlign:'center', }}>{log.title}</h1>
          <p>by {log.author}</p>
          <p>Visited On {formattedDate}</p>
          <p>{starRating} {log.rating}/10</p>
          
      </div>
  );
}
