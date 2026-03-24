from pydantic import BaseModel, EmailStr, Field
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
# AUTH

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: str = Field(min_length=2)


class UserLogin(BaseModel):
    email: EmailStr
    password: str

# EXPENSE

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

# INCOME

class IncomeCreate(BaseModel):
    month: str  # format: "YYYY-MM"
    amount: Decimal = Field(gt=0)


class IncomeRead(BaseModel):
    month: str
    amount: Decimal

# MONTHLY BUDGET

class MonthlyBudgetCreate(BaseModel):
    month: str  # format: "YYYY-MM"
    amount: Decimal = Field(gt=0)


class MonthlyBudgetRead(BaseModel):
    month: str
    amount: Decimal

# CATEGORY BUDGET

class CategoryBudgetCreate(BaseModel):
    category: str
    amount: Decimal = Field(gt=0)


class CategoryBudgetRead(BaseModel):
    category: str
    amount: Decimal