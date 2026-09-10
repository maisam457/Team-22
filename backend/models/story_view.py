from sqlalchemy import Column, String, ForeignKey, DateTime
from datetime import datetime
from db import Base

class StoryView(Base):
    __tablename__ = 'story_views'
    
    id = Column(String(50), primary_key=True)
    story_id = Column(String(50), ForeignKey('stories.id'), nullable=False)
    viewer_id = Column(String(50), nullable=False)  # Who viewed the story
    viewer_type = Column(String(20), nullable=False)  # 'child', 'student_athlete', 'coach', 'team', 'alumni'
    viewed_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'storyId': self.story_id,
            'viewerId': self.viewer_id,
            'viewerType': self.viewer_type,
            'viewedAt': self.viewed_at.isoformat() + 'Z'
        }