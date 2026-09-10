from sqlalchemy import Column, String, ForeignKey, DateTime
from datetime import datetime
from db import Base

class ThreadReaction(Base):
    __tablename__ = 'thread_reactions'
    
    id = Column(String(50), primary_key=True)
    message_id = Column(String(50), ForeignKey('thread_messages.id'), nullable=False)
    user_id = Column(String(50), nullable=False)  # Who reacted
    user_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team', 'alumni'
    reaction_type = Column(String(20), nullable=False)  # 'like', 'support', 'celebrate', 'heart'
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'messageId': self.message_id,
            'userId': self.user_id,
            'userType': self.user_type,
            'reactionType': self.reaction_type,
            'createdAt': self.created_at.isoformat() + 'Z'
        }