from pydantic import BaseModel, EmailStr, Field
from datetime import date, datetime
from decimal import Decimal
from typing import Optional

# Auth
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: str = Field(min_length=2)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Expense
class ExpenseCreate(BaseModel):
    amount: Decimal = Field(gt=0)
    description: str = Field(min_length=1, max_length=255)
    category: Optional[str] = None
    date: date

class ExpenseRead(BaseModel):
    id: int
    amount: Decimal
    description: str
    category: Optional[str] = None
    date: date
    created_at: datetime

    class Config:
        from_attributes = True