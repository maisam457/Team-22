from sqlalchemy import Column, String, Integer, JSON, DateTime, Text
from datetime import datetime
from db import Base

class Child(Base):
    __tablename__ = 'children'
    
    id = Column(String(50), primary_key=True)
    child_name = Column(String(100), nullable=False)
    child_age = Column(Integer, nullable=False)
    child_interests = Column(JSON)  # Array of interest tags
    location = Column(JSON)  # {city, state, lat, lng}
    bio = Column(Text)
    avatar_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'childName': self.child_name,
            'childAge': self.child_age,
            'childInterests': self.child_interests or [],
            'location': self.location,
            'bio': self.bio,
            'avatarUrl': self.avatar_url,
            'createdAt': self.created_at.isoformat() + 'Z'
        }
