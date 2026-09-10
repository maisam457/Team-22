from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models.student_athlete import StudentAthlete
from models.coach import Coach
from models.team import Team

def check_and_transition_to_alumni(session: Session):
    """
    Check all active users and transition them to alumni status if they've been inactive for 2+ years.
    This should be run as a scheduled job (e.g., daily cron job).
    """
    two_years_ago = datetime.utcnow() - timedelta(days=730)  # 2 years = 730 days
    
    # Check Student Athletes
    inactive_students = session.query(StudentAthlete).filter(
        StudentAthlete.is_active == True,
        StudentAthlete.is_alumni == False,
        StudentAthlete.last_active_at < two_years_ago
    ).all()
    
    for student in inactive_students:
        student.is_active = False
        student.is_alumni = True
        print(f"Transitioned student {student.student_name} to alumni status")
    
    # Check Coaches
    inactive_coaches = session.query(Coach).filter(
        Coach.is_active == True,
        Coach.is_alumni == False,
        Coach.last_active_at < two_years_ago
    ).all()
    
    for coach in inactive_coaches:
        coach.is_active = False
        coach.is_alumni = True
        print(f"Transitioned coach {coach.coach_name} to alumni status")
    
    # Check Teams
    inactive_teams = session.query(Team).filter(
        Team.is_active == True,
        Team.is_alumni == False,
        Team.last_active_at < two_years_ago
    ).all()
    
    for team in inactive_teams:
        team.is_active = False
        team.is_alumni = True
        print(f"Transitioned team {team.team_name} to alumni status")
    
    session.commit()
    return len(inactive_students) + len(inactive_coaches) + len(inactive_teams)

def get_user_role(user_type: str, is_alumni: bool = False) -> str:
    """
    Convert backend user type to frontend role.
    """
    if user_type == 'child':
        return 'CHILD'
    elif user_type in ['student_athlete', 'coach', 'team']:
        return 'ALUMNI' if is_alumni else 'ATHLETE'
    else:
        return 'ALUMNI'  # Default fallback
