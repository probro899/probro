import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Button } from '../../../../../common/utility-functions/Button/Button';
import Card from '../../../../../common/Card';

const UploadedVideoList = ({ resources, startDeletion, toggleVideoForm, lecture }) => {
  if (!resources || resources.filter(o => o.type === 'video').length < 1) return null;
  return (
    <Card>
      <div className="uploaded-content">
        <ul className="uploaded-list">
          {
            resources.filter(o => o.type === 'video').map(o => {
              return (
                <li key={`video-${o.id}`} className="list-item">
                  <div className="video-detail">
                    <div className="left-content">
                      <figure className="thumbnail">
                        <img src="/assets/graphics/angular.jpg" alt="thumbnail" />
                      </figure>
                      <div className="details">
                        <p className="video-title">{o.name}</p>
                        <p className="video-date">{new Date(o.updatedAt || o.createdAt).toDateString()}</p>
                      </div>
                    </div>
                    <div className="button-group">
                      <div className="edit-btn">
                        <Button type="button" onClick={() => toggleVideoForm(true)} buttonStyle="btn--primary--outline" buttonSize="btn--small" icon={<BiEdit size={20} />} />
                      </div>
                      <div className="delete-btn">
                        <Button type="button" onClick={() => startDeletion('resource', lecture.sectionId, lecture.id, o.id)} buttonStyle="btn--danger--outline" buttonSize="btn--small" icon={<AiOutlineDelete size={20} />} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </Card>
  );
};

export default UploadedVideoList;
