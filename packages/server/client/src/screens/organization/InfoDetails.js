import React from 'react'
import { BiCurrentLocation } from 'react-icons/bi';

export const InfoDetails = () => {
  return (
      <div className="pc-top-details">
          <div className="pc-desc">
              <div className="pc-name">Test Organization</div>
              <div className="pc-location"><BiCurrentLocation size={20} />
                  <span className="pc-city">Kathmandu, Nepal</span>
              </div>
              <div className="pc-bio">
                  <p>Software development, surpassing your expectations</p>
              </div>
          </div>
      </div>
  )
}
