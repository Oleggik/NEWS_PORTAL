using System.Web.Http;
using System.Threading.Tasks;
using System.Net.Http;
using System;

namespace NewsPortal.Web.Controllers
{
    [Authorize]
    public class FileUploadController : ApiController
    {
        [HttpPost]
        [Route("api/file/upload")]
        public async Task<IHttpActionResult> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest();
            }
            var provider = new MultipartMemoryStreamProvider();
            string root = System.Web.HttpContext.Current.Server.MapPath("~/Content/");
            await Request.Content.ReadAsMultipartAsync(provider);

            string path = string.Empty;

            foreach (var file in provider.Contents)
            {
                var filename = Guid.NewGuid().ToString() + file.Headers.ContentDisposition.FileName.Trim('\"');
                byte[] fileArray = await file.ReadAsByteArrayAsync();

                using (System.IO.FileStream fs = new System.IO.FileStream(root + filename, System.IO.FileMode.Create))
                {
                    await fs.WriteAsync(fileArray, 0, fileArray.Length);
                }

                path = "/Content/" + filename;
            }
            return Ok(new { link = path });
        }
    }
}
