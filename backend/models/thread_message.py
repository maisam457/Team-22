from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Boolean
from datetime import datetime
from db import Base

class ThreadMessage(Base):
    __tablename__ = 'thread_messages'
    
    id = Column(String(50), primary_key=True)
    conversation_id = Column(String(50), ForeignKey('conversations.id'), nullable=False)
    author_id = Column(String(50), nullable=False)  # Who wrote the message
    author_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team', 'alumni'
    content = Column(Text, nullable=False)
    media_url = Column(String(500))  # Image/video attachment
    is_edited = Column(Boolean, default=False)  # Was message edited
    parent_message_id = Column(String(50), ForeignKey('thread_messages.id'))  # For replies
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'conversationId': self.conversation_id,
            'authorId': self.author_id,
            'authorType': self.author_type,
            'content': self.content,
            'mediaUrl': self.media_url,
            'isEdited': self.is_edited,
            'parentMessageId': self.parent_message_id,
            'createdAt': self.created_at.isoformat() + 'Z',
            'updatedAt': self.updated_at.isoformat() + 'Z'
        }
