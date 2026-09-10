from sqlalchemy import Column, String, JSON, DateTime, Boolean, Integer, Text
from datetime import datetime
from db import Base

class Conversation(Base):
    __tablename__ = 'conversations'
    
    id = Column(String(50), primary_key=True)
    title = Column(String(200), nullable=False)  # Thread title
    description = Column(Text)  # Thread description
    author_id = Column(String(50), nullable=False)  # Who started the thread
    author_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team', 'alumni'
    tags = Column(JSON)  # Thread tags for categorization
    is_active = Column(Boolean, default=True)  # Is thread still active
    is_pinned = Column(Boolean, default=False)  # Is thread pinned
    view_count = Column(Integer, default=0)  # How many views
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'authorId': self.author_id,
            'authorType': self.author_type,
            'tags': self.tags or [],
            'isActive': self.is_active,
            'isPinned': self.is_pinned,
            'viewCount': self.view_count,
            'createdAt': self.created_at.isoformat() + 'Z',
            'updatedAt': self.updated_at.isoformat() + 'Z'
        }