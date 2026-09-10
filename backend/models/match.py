from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean
from datetime import datetime, timedelta
from db import Base

class Match(Base):
    __tablename__ = 'matches'
    
    id = Column(String(50), primary_key=True)
    child_id = Column(String(50), ForeignKey('children.id'), nullable=False)
    match_type = Column(String(20), nullable=False)  # 'student_athlete', 'coach', 'team'
    match_id = Column(String(50), nullable=False)  # ID of the matched entity
    status = Column(String(20), default='Active')  # 'Active', 'Not Active'
    session_start = Column(DateTime, default=datetime.utcnow)  # When the 2-year session started
    session_end = Column(DateTime, nullable=True)  # When the session ended
    is_session_completed = Column(Boolean, default=False)  # True if 2-year session is done
    can_rematch = Column(Boolean, default=True)  # False if they can't be matched again
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def is_session_expired(self):
        """Check if the 2-year session has expired"""
        if self.session_start:
            return datetime.utcnow() > (self.session_start + timedelta(days=730))  # 2 years = 730 days
        return False
    
    def get_session_days_remaining(self):
        """Get days remaining in the 2-year session"""
        if self.session_start:
            days_elapsed = (datetime.utcnow() - self.session_start).days
            return max(0, 730 - days_elapsed)  # 730 days = 2 years
        return 0
    
    def to_dict(self):
        return {
            'id': self.id,
            'childId': self.child_id,
            'matchType': self.match_type,
            'matchId': self.match_id,
            'status': self.status,
            'sessionStart': self.session_start.isoformat() + 'Z' if self.session_start else None,
            'sessionEnd': self.session_end.isoformat() + 'Z' if self.session_end else None,
            'isSessionCompleted': self.is_session_completed,
            'canRematch': self.can_rematch,
            'isSessionExpired': self.is_session_expired(),
            'sessionDaysRemaining': self.get_session_days_remaining(),
            'createdAt': self.created_at.isoformat() + 'Z',
            'updatedAt': self.updated_at.isoformat() + 'Z'
        }
