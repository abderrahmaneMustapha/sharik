#django
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.core.validators import FileExtensionValidator

#package
from phonenumber_field.modelfields import PhoneNumberField



#me
from ..validators import validate_image_size
from ..managers import CustomUserManager

# Choices.
Male =1
Female=2
Gender = (
    (Male , _("Male")),
    (Female, _("Female"))
)
##  ############## Models #####################

class UserLevels(models.Model):
    name = models.CharField(_("username"), max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
#Custome user model , but in the interface will be displayed as Member
class Member(AbstractUser): 
    username =models.CharField(_("username"), max_length=150)
    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150)
    date_birth = models.DateField(_("date of birth"), auto_now=False, auto_now_add=False)
    level = models.ForeignKey(UserLevels,verbose_name=_("user study level and field"), on_delete=models.CASCADE)
    email = models.EmailField(_('email adress'), unique=True)
    phone = PhoneNumberField(_("phone number"))
    gender =models.IntegerField(_("Gender"), choices = Gender, default=1)
    description  = models.TextField(_("a short description"))
    univ_key  = models.CharField(_("University key"), max_length=300, unique=True)
    adress = models.CharField(_("adress"), max_length=500)
    city = models.CharField(verbose_name=_("Wilaya in algeria"), max_length=500)
    profile_pic = models.ImageField(_('profile pic'), upload_to='users/profile_pics',validators=[validate_image_size, FileExtensionValidator(['jpg','jpeg','png', 'webp', 'svg'])] ,null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        verbose_name = "Member"
        verbose_name_plural = "Members"
    def __str__(self):
        return str(self.email)

class Tag(models.Model):
    name = models.CharField(_("tag name"),max_length=500 )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
    def __str__(self):
        return str(self.name)