import React from 'react';
import type { Pin } from '../types';
import PinCard from './PinCard';

interface Props {
  pins: Pin[];
}

const MasonryGrid: React.FC<Props> = ({ pins }) => {
  return (
    <div className="container-fluid mt-4">
      <div className="masonry-grid">
        {pins.map((pin) => (
          <div className="masonry-item" key={pin.id}>
            <PinCard pin={pin} />
          </div>
        ))}
      </div>
      <style>{`
        .masonry-grid {
          column-count: 5;
          column-gap: 1rem;
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1rem;
        }
        @media (max-width: 1200px) {
          .masonry-grid { column-count: 4; }
        }
        @media (max-width: 992px) {
          .masonry-grid { column-count: 3; }
        }
        @media (max-width: 768px) {
          .masonry-grid { column-count: 2; }
        }
        @media (max-width: 576px) {
          .masonry-grid { column-count: 2; }
        }
        
        .pin-card img {
            transition: filter 0.2s;
        }
        .pin-card:hover img {
            filter: brightness(0.8);
        }
      `}</style>
    </div>
  );
};

export default MasonryGrid;
