import React from 'react';
import { Tooltip } from './Form/Tooltip';

export function VerifiedBadge() {
    return (
        <>
            <Tooltip content="verified" position="top">
                <img className="pc-verified-badge" src="/assets/graphics/verified.svg" alt="verified mentor" />
            </Tooltip>
        </>
    )
}
