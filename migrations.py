#!/usr/bin/env python3
"""
Database migration script for Trenera application
"""
import os
import sys
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from app_v3 import app, db, User, Team, Player, Payment, TrainingSession, Attendance
from werkzeug.security import generate_password_hash

def create_admin_user():
    """Create default admin user if not exists"""
    with app.app_context():
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(
                username='admin',
                password_hash=generate_password_hash('admin123'),
                role='admin'
            )
            db.session.add(admin)
            db.session.commit()
            print("✅ Admin user created: admin/admin123")
        else:
            print("ℹ️ Admin user already exists")

def create_sample_teams():
    """Create sample teams if none exist"""
    with app.app_context():
        if Team.query.count() == 0:
            teams = [
                Team(name="Момчета U12", age_group="10-12", gender="boys"),
                Team(name="Момчета U14", age_group="12-14", gender="boys"),
                Team(name="Момичета U12", age_group="10-12", gender="girls"),
                Team(name="Момичета U14", age_group="12-14", gender="girls"),
            ]
            for team in teams:
                db.session.add(team)
            db.session.commit()
            print("✅ Sample teams created")
        else:
            print("ℹ️ Teams already exist")

def backup_sqlite_data():
    """Backup SQLite data to CSV files"""
    import pandas as pd
    from datetime import datetime
    
    backup_dir = Path("backup") / datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    with app.app_context():
        # Backup players
        players = Player.query.all()
        if players:
            players_data = []
            for p in players:
                players_data.append({
                    'id': p.id,
                    'full_name': p.full_name,
                    'birth_date': p.birth_date.isoformat() if p.birth_date else None,
                    'player_phone': p.player_phone,
                    'parent_phone': p.parent_phone,
                    'parent_telegram_id': p.parent_telegram_id,
                    'email': p.email,
                    'notes': p.notes,
                    'team_id': p.team_id
                })
            pd.DataFrame(players_data).to_csv(backup_dir / "players.csv", index=False)
            print(f"✅ Players backed up to {backup_dir / 'players.csv'}")
        
        # Backup payments
        payments = Payment.query.all()
        if payments:
            payments_data = []
            for p in payments:
                payments_data.append({
                    'id': p.id,
                    'player_id': p.player_id,
                    'year': p.year,
                    'month': p.month,
                    'amount': p.amount,
                    'status': p.status,
                    'paid_at': p.paid_at.isoformat() if p.paid_at else None,
                    'note': p.note
                })
            pd.DataFrame(payments_data).to_csv(backup_dir / "payments.csv", index=False)
            print(f"✅ Payments backed up to {backup_dir / 'payments.csv'}")
        
        # Backup teams
        teams = Team.query.all()
        if teams:
            teams_data = []
            for t in teams:
                teams_data.append({
                    'id': t.id,
                    'name': t.name,
                    'age_group': t.age_group,
                    'gender': t.gender
                })
            pd.DataFrame(teams_data).to_csv(backup_dir / "teams.csv", index=False)
            print(f"✅ Teams backed up to {backup_dir / 'teams.csv'}")

def restore_from_csv():
    """Restore data from CSV backup files"""
    import pandas as pd
    
    backup_dir = Path("backup")
    if not backup_dir.exists():
        print("❌ No backup directory found")
        return
    
    # Find latest backup
    backup_dirs = [d for d in backup_dir.iterdir() if d.is_dir()]
    if not backup_dirs:
        print("❌ No backup directories found")
        return
    
    latest_backup = max(backup_dirs, key=lambda x: x.name)
    print(f"📁 Restoring from {latest_backup}")
    
    with app.app_context():
        # Restore teams
        teams_file = latest_backup / "teams.csv"
        if teams_file.exists():
            teams_df = pd.read_csv(teams_file)
            for _, row in teams_df.iterrows():
                team = Team.query.get(row['id'])
                if not team:
                    team = Team(
                        id=row['id'],
                        name=row['name'],
                        age_group=row['age_group'],
                        gender=row['gender']
                    )
                    db.session.add(team)
            db.session.commit()
            print("✅ Teams restored")
        
        # Restore players
        players_file = latest_backup / "players.csv"
        if players_file.exists():
            players_df = pd.read_csv(players_file)
            for _, row in players_df.iterrows():
                player = Player.query.get(row['id'])
                if not player:
                    birth_date = None
                    if pd.notna(row['birth_date']):
                        birth_date = pd.to_datetime(row['birth_date']).date()
                    
                    player = Player(
                        id=row['id'],
                        full_name=row['full_name'],
                        birth_date=birth_date,
                        player_phone=row['player_phone'],
                        parent_phone=row['parent_phone'],
                        parent_telegram_id=row['parent_telegram_id'],
                        email=row['email'],
                        notes=row['notes'],
                        team_id=row['team_id']
                    )
                    db.session.add(player)
            db.session.commit()
            print("✅ Players restored")
        
        # Restore payments
        payments_file = latest_backup / "payments.csv"
        if payments_file.exists():
            payments_df = pd.read_csv(payments_file)
            for _, row in payments_df.iterrows():
                payment = Payment.query.get(row['id'])
                if not payment:
                    paid_at = None
                    if pd.notna(row['paid_at']):
                        paid_at = pd.to_datetime(row['paid_at'])
                    
                    payment = Payment(
                        id=row['id'],
                        player_id=row['player_id'],
                        year=row['year'],
                        month=row['month'],
                        amount=row['amount'],
                        status=row['status'],
                        paid_at=paid_at,
                        note=row['note']
                    )
                    db.session.add(payment)
            db.session.commit()
            print("✅ Payments restored")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python migrations.py init     - Initialize database and create admin user")
        print("  python migrations.py backup   - Backup current data to CSV")
        print("  python migrations.py restore  - Restore data from CSV backup")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "init":
        print("🚀 Initializing database...")
        with app.app_context():
            db.create_all()
        create_admin_user()
        create_sample_teams()
        print("✅ Database initialized successfully!")
    
    elif command == "backup":
        print("💾 Creating backup...")
        backup_sqlite_data()
        print("✅ Backup completed!")
    
    elif command == "restore":
        print("📥 Restoring from backup...")
        restore_from_csv()
        print("✅ Restore completed!")
    
    else:
        print(f"❌ Unknown command: {command}")
        sys.exit(1)
