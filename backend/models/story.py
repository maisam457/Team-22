from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Boolean
from datetime import datetime
from db import Base

class Story(Base):
    __tablename__ = 'stories'
    
    id = Column(String(50), primary_key=True)
    author_id = Column(String(50), nullable=False)  # Who created the story
    author_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team', 'alumni'
    content = Column(Text)  # Story text content
    media_url = Column(String(500))  # Image/video URL
    media_type = Column(String(20))  # 'image' or 'video'
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)  # 24 hours from creation
    is_active = Column(Boolean, default=True)  # Is story still active (not expired)
    
    def to_dict(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'authorType': self.author_type,
            'content': self.content,
            'mediaUrl': self.media_url,
            'mediaType': self.media_type,
            'createdAt': self.created_at.isoformat() + 'Z',
            'expiresAt': self.expires_at.isoformat() + 'Z',
            'isActive': self.is_active
        }