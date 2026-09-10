from sqlalchemy import Column, String, ForeignKey, DateTime, Boolean
from datetime import datetime
from db import Base

class ThreadSubscription(Base):
    __tablename__ = 'thread_subscriptions'
    
    id = Column(String(50), primary_key=True)
    conversation_id = Column(String(50), ForeignKey('conversations.id'), nullable=False)
    user_id = Column(String(50), nullable=False)  # Who subscribed
    user_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team', 'alumni'
    is_notifications_enabled = Column(Boolean, default=True)  # Email notifications
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'conversationId': self.conversation_id,
            'userId': self.user_id,
            'userType': self.user_type,
            'isNotificationsEnabled': self.is_notifications_enabled,
            'createdAt': self.created_at.isoformat() + 'Z'
        }
