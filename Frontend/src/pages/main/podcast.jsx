import { useState, useEffect } from 'react';
import './Podcast.css';
import { apiUser } from '../../lib/apiUser';

const Podcast = () => {
  const [activeSeries, setActiveSeries] = useState(null);
  const [podcastData, setPodcastData] = useState({});
  const [seriesOrder, setSeriesOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiUser.get('/api/podcasts')
      .then((res) => {
        const podcasts = Array.isArray(res.data) ? res.data : [];

        // Group by series, preserving order within each series
        const grouped = {};
        const seen = [];
        podcasts
          .sort((a, b) => a.order - b.order)
          .forEach((p) => {
            if (!grouped[p.series]) {
              grouped[p.series] = [];
              seen.push(p.series);
            }
            grouped[p.series].push(p);
          });

        setPodcastData(grouped);
        setSeriesOrder(seen);
        if (seen.length > 0) setActiveSeries(seen[0]);
      })
      .catch(() => {
        // Fallback: show empty state gracefully
      })
      .finally(() => setLoading(false));
  }, []);

  const currentPodcasts = activeSeries ? (podcastData[activeSeries] || []) : [];

  return (
    <div className="main-content">
      <div className="podcast-container">
        <header className="podcast-header">
          <h1>Our Podcast Channel</h1>
          <p>Join us for inspiring conversations with amazing guests</p>
        </header>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>Loading podcasts…</div>
        )}

        {!loading && seriesOrder.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>No podcasts available yet.</div>
        )}

        {!loading && seriesOrder.length > 0 && (
          <>
            <div className="series-toggle">
              {seriesOrder.map((series) => (
                <button
                  key={series}
                  className={activeSeries === series ? 'active' : ''}
                  onClick={() => setActiveSeries(series)}
                >
                  {series}
                </button>
              ))}
            </div>

            <div className="podcast-grid">
              {currentPodcasts.map((podcast) => (
                <div key={podcast._id} className="podcast-card">
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="100%"
                      src={podcast.youtubeLink}
                      title={podcast.title}

                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="podcast-info">
                    <h2>{podcast.title}</h2>
                    <div className="meta-info">
                      <p><strong>Host:</strong> {podcast.host}</p>
                      <p><strong>Guest:</strong> {podcast.guest}</p>
                      <p><strong>Date:</strong> {podcast.date ? new Date(podcast.date).toLocaleDateString('en-GB') : 'TBA'}</p>
                    </div>
                    <p className="description">{podcast.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Podcast;
