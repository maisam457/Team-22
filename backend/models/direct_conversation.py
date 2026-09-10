from sqlalchemy import Column, String, JSON, DateTime, Boolean
from datetime import datetime
from db import Base

class DirectConversation(Base):
    __tablename__ = 'direct_conversations'
    
    id = Column(String(50), primary_key=True)
    participant_ids = Column(JSON, nullable=False)  # Array of 2 user IDs
    participant_types = Column(JSON, nullable=False)  # Array of 2 user types
    last_message_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)  # Is conversation still active
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'participantIds': self.participant_ids or [],
            'participantTypes': self.participant_types or [],
            'lastMessageAt': self.last_message_at.isoformat() + 'Z',
            'isActive': self.is_active,
            'createdAt': self.created_at.isoformat() + 'Z'
        }
