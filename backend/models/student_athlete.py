from sqlalchemy import Column, String, JSON, DateTime, Text, Boolean
from datetime import datetime
from db import Base

class StudentAthlete(Base):
    __tablename__ = 'student_athletes'
    
    id = Column(String(50), primary_key=True)
    student_name = Column(String(100), nullable=False)
    student_contact = Column(String(100), nullable=False)  # email/phone
    student_interests = Column(JSON)  # Array of interest tags
    location = Column(JSON)
    bio = Column(Text)
    avatar_url = Column(String(500))
    is_active = Column(Boolean, default=True)  # Is currently active
    is_alumni = Column(Boolean, default=False)  # Has graduated/become alumni
    last_active_at = Column(DateTime, default=datetime.utcnow)  # Last activity timestamp
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'studentName': self.student_name,
            'studentContact': self.student_contact,
            'studentInterests': self.student_interests or [],
            'location': self.location,
            'bio': self.bio,
            'avatarUrl': self.avatar_url,
            'isActive': self.is_active,
            'isAlumni': self.is_alumni,
            'lastActiveAt': self.last_active_at.isoformat() + 'Z',
            'createdAt': self.created_at.isoformat() + 'Z'
        }
