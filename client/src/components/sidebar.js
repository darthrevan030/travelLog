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
          <h2>{log.title}</h2>
      </div>
  );
}
