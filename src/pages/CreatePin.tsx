import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinService from '../services/pin.service';

const CreatePin: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        PinService.createPin({
            title,
            description,
            imageUrl,
        }).then(
            () => {
                navigate('/');
            },
            (error) => {
                console.error(error);
                setLoading(false);
            }
        );
    };

    return (
        <div className="container mt-5 pt-5 d-flex justify-content-center">
            <div className="card border-0 shadow-lg p-4" style={{ maxWidth: '800px', width: '100%', borderRadius: '32px' }}>
                <div className="row g-0">
                    <div className="col-md-5 bg-light rounded-4 d-flex align-items-center justify-content-center overflow-hidden" style={{ minHeight: '400px', backgroundColor: '#efefef' }}>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="img-fluid"
                                style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Invalid+Image+URL';
                                }}
                            />
                        ) : (
                            <div className="text-center text-muted p-4">
                                <div className="mb-2" style={{ fontSize: '2rem' }}>📷</div>
                                <p>Image preview will appear here</p>
                            </div>
                        )}
                    </div>
                    <div className="col-md-7 ps-md-4">
                        <h3 className="fw-bold mb-4">Create Pin</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="imageUrl" className="form-label">Image URL</label>
                                <input
                                    type="url"
                                    className="form-control rounded-pill bg-light border-0"
                                    id="imageUrl"
                                    placeholder="Add a link to your image"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg fw-bold border-0 border-bottom rounded-0"
                                    id="title"
                                    placeholder="Add your title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control border-0 border-bottom rounded-0"
                                    id="description"
                                    rows={3}
                                    placeholder="Tell everyone what your Pin is about"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-danger rounded-pill px-4 fw-bold" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePin;
