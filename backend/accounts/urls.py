from django.urls import path,include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import ProductsView, RegisterView, LoginView
from .views import RegisterView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import PasswordResetRequestView, PasswordResetConfirmView, ProfileView

router = DefaultRouter()
router.register(r'products', ProductsView, basename='products')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('products/', include(router.urls), name='products'),
]