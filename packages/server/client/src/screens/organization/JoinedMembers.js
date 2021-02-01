import React from 'react'

export const JoinedMembers = () => {
    return (
        <div className="pc-joined-members">
            <div className="pc-joined-header">
                <h3 className="pc-joined-title">People hightlights</h3>
            </div>
            <div className="pc-hightlight-people">
                <div className="pc-hightlight-people-container">
                    <div className="pc-hightlight-wrap">
                        <h4 className="pc-joined-people-number">20 joined members</h4>
                        <ul className="pc-joined-list">
                            <li>
                                <img class="landscape" src="http://localhost:3000/assets/user/10000003/profile/thumbnail-1607482166799.jpeg" alt="Round representation" />
                            </li>
                            <li>
                                <img class="landscape" src="http://localhost:3000/assets/user/10000003/profile/thumbnail-1607482166799.jpeg" alt="Round representation" />
                            </li>
                            <li>
                                <img class="landscape" src="http://localhost:3000/assets/user/10000003/profile/thumbnail-1607482166799.jpeg" alt="Round representation" />
                            </li>
                            <li>
                                <img class="landscape" src="http://localhost:3000/assets/user/10000003/profile/thumbnail-1607482166799.jpeg" alt="Round representation" />
                            </li>
                            <li>
                                <div className="pc-more-members">
                                    <div className="pc-more-number">+10</div>
                                </div>
                            </li>
                        </ul>
                        <p class="pc-hightlight-name">
                            Bikal, Ram, Shyam, Gopal &amp; 22 others
          </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
