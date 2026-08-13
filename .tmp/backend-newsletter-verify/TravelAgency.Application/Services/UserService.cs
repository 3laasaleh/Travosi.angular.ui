using AutoMapper;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.Common.Logging;
using TravelAgency.Application.Common.Interfaces;
using TravelAgency.Application.DTOs;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _logger;
        private readonly IEmailService _emailService;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IGenericRepository<Customer> _customerRepository;


        public UserService(IUserRepository userRepository,   IMapper mapper, ILogger<UserService> logger,
            IEmailService emailService, IJwtTokenGenerator jwtTokenGenerator,
            IGenericRepository<Customer> customerRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _emailService = emailService;
            _logger = logger;
            _jwtTokenGenerator = jwtTokenGenerator;
            _customerRepository = customerRepository;
        }

        public async Task<GenericResponse<bool>> ActivateAccountAsync(ActivateAccountDto user, CancellationToken cancellationToken) {

            try
            {

                var existUser = await _userRepository.GetUserByEmailAsync(user.Email, cancellationToken);
                if (existUser == null)
                    return GenericResponse<bool>.Failure("Email is not exist!");

                await _userRepository.ActivateAccountAsync(existUser.Id, cancellationToken);

                return GenericResponse<bool>.Success(true,"Account Activated Successfully");

            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(UserService), nameof(ActivateAccountAsync));
                throw;
            }
        }

        public async Task<GenericResponse<string>> UserRegisteration(UserRegisterationDTO userModel, CancellationToken cancellationToken)
        {
            try
            {
                if (userModel.Mobile != null)
                {
                    var existUser = await _userRepository.GetUserByMobileAsync(userModel.Mobile, cancellationToken);
                    if (existUser != null)
                        return GenericResponse<string>.BadRequest("Mobile number is already Exist!");
                }
                if (userModel.Email != null)
                {
                    var existUser = await _userRepository.GetUserByEmailAsync(userModel.Email, cancellationToken);
                    if (existUser != null)
                        return GenericResponse<string>.BadRequest("Email is already Exist!");
                }

                var normalizedEmail = userModel.Email!.Trim().ToLower();
                var normalizedMobile = userModel.Mobile!.Trim();
                var existingCustomer = await _customerRepository.GetByAsync(customer =>
                    customer.Email.ToLower() == normalizedEmail || customer.Mobile == normalizedMobile);
                if (existingCustomer != null)
                    return GenericResponse<string>.BadRequest(
                        "A customer profile already exists with this email or mobile number.");

                var userEntity = _mapper.Map<User>(userModel);
                if (userModel.Password != null)
                {
                    userEntity.SaltKey = Helper.GeneratedSalt();
                    userEntity.Password_Hashed = Helper.GetPasswordHash(userModel.Password, userEntity.SaltKey);
                    userEntity.CreatedAt = DateTime.Now;
                    userEntity.IsActivated = true;
                    userEntity.Role = UserRoleEnum.Customer;

                    var customer = new Customer
                    {
                        FirstName = userModel.FirstName!.Trim(),
                        LastName = userModel.LastName!.Trim(),
                        Email = userModel.Email!.Trim(),
                        Mobile = userModel.Mobile!.Trim(),
                        CustomerType = CustomerTypeEnum.Individual,
                        CompanyName = null,
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true,
                        Travelers = new List<Traveler>
                        {
                            new()
                            {
                                FirstName = userModel.FirstName.Trim(),
                                LastName = userModel.LastName.Trim(),
                                PassportNumber = userModel.PassportNumber!.Trim(),
                                DateOfBirth = userModel.DateOfBirth,
                                Gender = userModel.Gender,
                                TravelerType = TravelerTypeEnum.Adult,
                                Relationship = "Primary",
                                IsPrimary = true
                            }
                        }
                    };

                    await _userRepository.AddAccountAsync(userEntity, customer, cancellationToken);
                  //var token=  _jwtTokenGenerator.GenerateForgetPasswordToken(userEntity.FirstName +" " + userEntity.LastName, userEntity.Email);
                    //if (string.IsNullOrEmpty(userEntity.Email)|| string.IsNullOrEmpty(token))
                    //{
                    //    _logger.LogWarning(
                    //        "Registration could not issue an activation token for {Email}",
                    //        userEntity.Email);
                    //    return GenericResponse<string>.Success("token or email is invalid");
                    //}

                    //await   _emailService.SendActivateAccountEmailAsync(userEntity.Email, token);

                    _logger.LogInformation(
                        "User registration completed for {Email}",
                        userEntity.Email);

                    return GenericResponse<string>.Success("Account created successfully");

                }



                return GenericResponse<string>.Failure("Failed to create new user!");



            }
            catch (Exception e)
            {
                if (ExceptionLogState.TryMarkLogged(e))
                {
                    _logger.LogError(
                        e,
                        "User registration failed for {Email}",
                        userModel.Email);
                }
                throw;
            }
        }
        public async Task<GenericResponse<string>> ForgetPasswordAsync(ForgotPasswordRequestDTO user, CancellationToken cancellationToken)
        {
            try
            {
                var existUser = await _userRepository.GetUserByEmailAsync(user.Email, cancellationToken);
                if (existUser == null)
                    return GenericResponse<string>.Failure("Email is not exist!");


                var token = _jwtTokenGenerator.GenerateForgetPasswordToken(existUser.FirstName,user.Email);
                await _emailService.SendResetPassWordEmailAsync(user.Email, token);

                return GenericResponse<string>.Success("a link to reset password has been sent to your email , Thanks");

            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(UserService), nameof(ForgetPasswordAsync));
                throw;
            }
        }
        public async Task<GenericResponse<bool>> ChangePasswordAsync(CustomResetPasswordRequestDTO resetPasswordRequest, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(resetPasswordRequest.Email, cancellationToken);
                if (user == null)
                    return GenericResponse<bool>.Unauthorized("email or mobile  doesn`t exist");
                var salt = Helper.GeneratedSalt();
                var _Password_Hashed = Helper.GetPasswordHash(resetPasswordRequest.NewPassword, salt);
                user.Password_Hashed = _Password_Hashed;
                await _userRepository.UpdateUserPasswordAsync(user, cancellationToken);

                return GenericResponse<bool>.Success(true);

            }
            catch (Exception e)
            {
                if (ExceptionLogState.TryMarkLogged(e))
                {
                    _logger.LogError(
                        e,
                        "Password reset failed for {Email}",
                        resetPasswordRequest.Email);
                }

                throw;
            }
        }
        public async Task<GenericResponse<bool>> ChangePasswordProfileAsync(ChangePasswordRequestDTO resetPasswordRequest, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(resetPasswordRequest.Email, cancellationToken);
                if (user == null)
                    return GenericResponse<bool>.Failure("email or mobile  doesn`t exist");
                var salt = Helper.GeneratedSalt();
                var _Password_Hashed = Helper.GetPasswordHash(resetPasswordRequest.Password, salt);
                user.Password_Hashed = _Password_Hashed;
                user.SaltKey = salt;
                await _userRepository.UpdateUserPasswordAsync(user, cancellationToken);

                return GenericResponse<bool>.Success(true, "Password has been change successfully.");

            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(UserService), nameof(ChangePasswordProfileAsync));
                throw;
            }
        }

        public async Task<GenericResponse<IList<AgentListItemDTO>>> GetAgentsAsync(
            CancellationToken cancellationToken,
            int? maxResults = null)
        {
            try
            {
                var agents = await _userRepository.GetUsersByRoleAsync(UserRoleEnum.Agent, cancellationToken);
                var query = agents.Where(agent => agent.IsActivated).AsEnumerable();
                if (maxResults.HasValue)
                    query = query.Take(Math.Max(0, maxResults.Value));

                var res = query.Select(a => new AgentListItemDTO
                {
                    Id = a.Id,
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    Email = a.Email,
                    ProfileImageUrl = a.ProfileImageUrl
                }).ToList();

                return GenericResponse<IList<AgentListItemDTO>>.Success(res);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(UserService), nameof(GetAgentsAsync));
                throw;
            }
        }

        public async Task<GenericResponse<string>> AddProfileImageAsync(
            int userId,
            Microsoft.AspNetCore.Http.IFormFile image,
            CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId, cancellationToken);
                if (user == null)
                    return GenericResponse<string>.NotFound("User was not found.");

                if (image == null || image.Length == 0)
                    return GenericResponse<string>.BadRequest("A profile image is required.");

                const long maximumImageSize = 5 * 1024 * 1024;
                if (image.Length > maximumImageSize)
                    return GenericResponse<string>.BadRequest("Profile image size cannot exceed 5 MB.");

                var extension = Path.GetExtension(Path.GetFileName(image.FileName)).ToLowerInvariant();
                var allowedExtensions = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
                {
                    ".jpg", ".jpeg", ".png", ".webp", ".gif"
                };
                if (!allowedExtensions.Contains(extension) ||
                    !image.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
                {
                    return GenericResponse<string>.BadRequest(
                        "Only JPG, JPEG, PNG, WEBP, or GIF images are allowed.");
                }

                var userFolder = GetUserImageFolder(userId);
                Directory.CreateDirectory(userFolder);

                var fileName = $"{Guid.NewGuid():N}{extension}";
                var filePath = Path.Combine(userFolder, fileName);
                await using (var stream = new FileStream(filePath, FileMode.CreateNew))
                {
                    await image.CopyToAsync(stream, cancellationToken);
                }

                var imageUrl = $"images/users/{userId}/{fileName}";
                try
                {
                    await _userRepository.UpdateProfileImageAsync(userId, imageUrl, cancellationToken);
                }
                catch
                {
                    File.Delete(filePath);
                    throw;
                }

                DeleteStoredProfileImage(userId, user.ProfileImageUrl);
                return GenericResponse<string>.Success(imageUrl, "Profile image added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(UserService), nameof(AddProfileImageAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> RemoveProfileImageAsync(
            int userId,
            CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId, cancellationToken);
                if (user == null)
                    return GenericResponse<bool>.NotFound("User was not found.");

                if (string.IsNullOrWhiteSpace(user.ProfileImageUrl))
                    return GenericResponse<bool>.Success(true, "User has no profile image.");

                await _userRepository.UpdateProfileImageAsync(userId, null, cancellationToken);
                DeleteStoredProfileImage(userId, user.ProfileImageUrl);

                return GenericResponse<bool>.Success(true, "Profile image removed successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(UserService), nameof(RemoveProfileImageAsync));
                throw;
            }
        }

        private static string GetUserImageFolder(int userId)
        {
            return Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot", "images", "users", userId.ToString());
        }

        private static void DeleteStoredProfileImage(int userId, string? imageUrl)
        {
            if (string.IsNullOrWhiteSpace(imageUrl))
                return;

            var fileName = Path.GetFileName(imageUrl);
            if (string.IsNullOrWhiteSpace(fileName))
                return;

            var filePath = Path.Combine(GetUserImageFolder(userId), fileName);
            if (File.Exists(filePath))
                File.Delete(filePath);
        }

        public async Task<GenericResponse<UserLoginDTO>> FindByEmailAsync(string email, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(email, cancellationToken);
                if (user == null)
                    return GenericResponse<UserLoginDTO>.Failure("this email doesn`t exist");


                var _userEntity = _mapper.Map<User>(user);
                var res = _mapper.Map<UserLoginDTO>(user);

                return GenericResponse<UserLoginDTO>.Success(res);

            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(UserService), nameof(FindByEmailAsync));
                throw;
            }
        }

        public async Task<GenericResponse<UserLoginDTO>> LoginAsync(UserDTO userModel, CancellationToken cancellationToken)
        {
            try
            {
                var userEntity = await _userRepository.GetUserByEmailAsync(userModel.Email, cancellationToken);
                //if (userEntity == null)
                //userEntity = await _userRepository.GetUserByMobileAsync(userModel.EmailOrMobile, cancellationToken);


                if (userEntity == null)
                {
                    _logger.LogWarning(
                        "Login failed for {Email}: invalid credentials",
                        userModel.Email);
                    return GenericResponse<UserLoginDTO>.Failure("Invalid email address or password");

                }

                var _Password_Hashed = Helper.GetPasswordHash(userModel.Password, userEntity.SaltKey);
                if (_Password_Hashed != userEntity.Password_Hashed)
                {
                    _logger.LogWarning(
                        "Login failed for {Email}: invalid credentials",
                        userModel.Email);
        
                    return GenericResponse<UserLoginDTO>.Failure("Invalid password");

                }

                //else if (!userEntity.IsActivated)
                //    return GenericResponse<UserLoginDTO>.Failure("Account not activated");

                _logger.LogInformation(
                    "User {UserId} logged in successfully",
                    userEntity.Id);

                var res = _mapper.Map<UserLoginDTO>(userEntity);

                res.Token = _jwtTokenGenerator.GenerateToken(res);
                return GenericResponse<UserLoginDTO>.Success(res);

            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(UserService), nameof(LoginAsync));
                throw;
            }
        }

      
    }
}
