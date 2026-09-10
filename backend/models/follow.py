from sqlalchemy import Column, String, ForeignKey, DateTime, Boolean
from datetime import datetime
from db import Base

class Follow(Base):
    __tablename__ = 'follows'
    
    id = Column(String(50), primary_key=True)
    follower_id = Column(String(50), nullable=False)  # Who is following
    follower_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team'
    following_id = Column(String(50), nullable=False)  # Who is being followed
    following_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team'
    is_active = Column(Boolean, default=True)  # Is follow relationship active
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'followerId': self.follower_id,
            'followerType': self.follower_type,
            'followingId': self.following_id,
            'followingType': self.following_type,
            'isActive': self.is_active,
            'createdAt': self.created_at.isoformat() + 'Z'
        }
