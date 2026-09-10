from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Boolean
from datetime import datetime
from db import Base

class DirectMessage(Base):
    __tablename__ = 'direct_messages'
    
    id = Column(String(50), primary_key=True)
    conversation_id = Column(String(50), ForeignKey('direct_conversations.id'), nullable=False)
    sender_id = Column(String(50), nullable=False)  # Who sent the message
    sender_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team', 'alumni'
    body = Column(Text, nullable=False)  # Message content
    media_url = Column(String(500))  # Image/video attachment
    is_read = Column(Boolean, default=False)  # Has message been read
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'conversationId': self.conversation_id,
            'senderId': self.sender_id,
            'senderType': self.sender_type,
            'body': self.body,
            'mediaUrl': self.media_url,
            'isRead': self.is_read,
            'createdAt': self.created_at.isoformat() + 'Z'
        }
