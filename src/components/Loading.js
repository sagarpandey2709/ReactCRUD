import React from 'react';

function Loading(params) {
    return (
        <div className="container mr-3">
            <div className="spinner-border text-dark m-5" role="status">
            <span className="visually-hidden">Loading...</span>
        </div> <span>Loading... Please wait.</span>
        </div>
    )
}

export default Loading;
