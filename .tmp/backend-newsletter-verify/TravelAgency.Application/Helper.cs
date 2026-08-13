using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using System.Text;

namespace TravelAgency.Application
{
    public static class Helper
    {

        public static Task DeleteImageAsync(string prePath,string fileName,CancellationToken cancellationToken = default)
        {
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot","images",prePath);

            var filePath = Path.Combine(uploadFolder, fileName);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            return Task.CompletedTask;
        }
        public static async Task SaveImagesAsync( string prePath,IFormFile image,CancellationToken cancellationToken = default)
        {
            try
            {
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot","images", prePath);
                if (File.Exists(uploadFolder))
                    return;

                    Directory.CreateDirectory(uploadFolder);

                var fileName = Path.GetFileName(image.FileName);
                var path = Path.Combine(uploadFolder, fileName);

                using var stream = new FileStream(path, FileMode.Create);

                await image.CopyToAsync(stream, cancellationToken);
            }
            catch (Exception)
            {

                throw;
            }

        }

        public static async Task SaveImagesAsync(string prePath,List<IFormFile> images,CancellationToken cancellationToken)
        {
            var uploadFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "images",
                prePath);

            if (!Directory.Exists(uploadFolder))
                Directory.CreateDirectory(uploadFolder);

            foreach (var image in images)
            {
                var fileName = Path.GetFileName(image.FileName);
                var path = Path.Combine(uploadFolder, fileName);

                // Skip if image already exists
                if (File.Exists(path))
                    continue;

                Directory.CreateDirectory(uploadFolder);

                await using var stream = new FileStream(path,FileMode.CreateNew,FileAccess.Write,FileShare.None);
                await image.CopyToAsync(stream, cancellationToken);
               
            }

        }
        public static string GeneratedSalt()
        {

            byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
            return Convert.ToBase64String(salt);

        }
        public static string GetPasswordHash(string password, string salt)
        {
            ASCIIEncoding encoding = new ASCIIEncoding();

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
                salt: encoding.GetBytes(salt),
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return hashed;
        }
    }
}
