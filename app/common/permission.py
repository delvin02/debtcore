from rest_framework import permissions

class IsAdminOrStaff(permissions.BasePermission):
    """
    Custom permission to only allow administrators or staff members to access the endpoint.
    """

    def has_permission(self, request, view):
        # Check if the user is authenticated and either an admin or a staff member
        return request.user and request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser)