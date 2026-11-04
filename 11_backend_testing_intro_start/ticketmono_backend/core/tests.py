from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your tests here.
class UserRegistrationViewTestCase(APITestCase):
    url = "/api/v1/auth/register/"

    # Can successfully register a user
    def test_register_creates_new_user(self):
        payload = {
            "username": "testUser",
            "email": "test@user.com",
            "password": "testpass123",
        }
        response = self.client.post(self.url, payload)

        self.assertEqual(User.objects.count(), 1)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["message"], "User registered successfully.")

    # Register with missing fields fails
    def test_register_with_missing_fields_fails(self):
        payload = {"username": "testuser"}
        response = self.client.post(self.url, payload)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 0)

    # Registering a duplicate username should fail
    def test_register_with_duplicate_username_fails(self):
        User.objects.create_user(username="existing", email="e@mail.com", password="testpass123")
        payload = {
            "username": "existing",
            "email": "e@mail.com",
            "password": "testpass123",
        }
        response = self.client.post(self.url, payload)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 1)

class MeViewTestCase(APITestCase):
    url ="/api/v1/auth/me/"

    def setUp(self):
        self.user = User.objects.create_user(
            username="testUser",
            email="test@example.com",
            password="testpass123",
            role="user"
        )

    def test_me_returns_user_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["username"], self.user.username)
        self.assertEqual(response.data["email"], self.user.email)
        self.assertEqual(response.data["role"], self.user.role)
        self.assertEqual(response.data["id"], self.user.id)

    def test_me_requires_authentication(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)