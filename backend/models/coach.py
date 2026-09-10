from sqlalchemy import Column, String, JSON, DateTime, Text, Boolean
from datetime import datetime
from db import Base

class Coach(Base):
    __tablename__ = 'coaches'
    
    id = Column(String(50), primary_key=True)
    coach_name = Column(String(100), nullable=False)
    coach_contact = Column(String(100), nullable=False)
    location = Column(JSON)
    bio = Column(Text)
    avatar_url = Column(String(500))
    is_active = Column(Boolean, default=True)  # Is currently active
    is_alumni = Column(Boolean, default=False)  # Has retired/become alumni
    last_active_at = Column(DateTime, default=datetime.utcnow)  # Last activity timestamp
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'coachName': self.coach_name,
            'coachContact': self.coach_contact,
            'location': self.location,
            'bio': self.bio,
            'avatarUrl': self.avatar_url,
            'isActive': self.is_active,
            'isAlumni': self.is_alumni,
            'lastActiveAt': self.last_active_at.isoformat() + 'Z',
            'createdAt': self.created_at.isoformat() + 'Z'
        }
