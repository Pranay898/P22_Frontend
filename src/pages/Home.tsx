import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PinService from '../services/pin.service';
import MasonryGrid from '../components/MasonryGrid';
import type { Pin } from '../types';

const Home: React.FC = () => {
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    useEffect(() => {
        setLoading(true);
        if (searchQuery) {
            PinService.searchPins(searchQuery).then(
                (response) => {
                    setPins(response.data);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                    setLoading(false);
                }
            );
        } else {
            PinService.getAllPins().then(
                (response) => {
                    setPins(response.data);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                    setLoading(false);
                }
            );
        }
    }, [searchQuery]);

    return (
        <div className="container-fluid pt-5 mt-3">
            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {pins.length === 0 && (
                        <div className="text-center mt-5">
                            <h3>No pins found</h3>
                        </div>
                    )}
                    <MasonryGrid pins={pins} />
                </>
            )}
        </div>
    );
};

export default Home;
