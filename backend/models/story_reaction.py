from sqlalchemy import Column, String, ForeignKey, DateTime
from datetime import datetime
from db import Base

class StoryReaction(Base):
    __tablename__ = 'story_reactions'
    
    id = Column(String(50), primary_key=True)
    story_id = Column(String(50), ForeignKey('stories.id'), nullable=False)
    user_id = Column(String(50), nullable=False)  # Who reacted
    user_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team', 'alumni'
    reaction_type = Column(String(20), nullable=False)  # 'like', 'support', 'celebrate'
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'storyId': self.story_id,
            'userId': self.user_id,
            'userType': self.user_type,
            'reactionType': self.reaction_type,
            'createdAt': self.created_at.isoformat() + 'Z'
        }