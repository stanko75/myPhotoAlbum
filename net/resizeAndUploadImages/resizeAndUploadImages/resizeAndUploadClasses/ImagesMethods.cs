namespace ResizeAndUploadImages.ResizeAndUploadClasses
{
  using System.Diagnostics.CodeAnalysis;
  using System.Drawing;
  using System.Drawing.Drawing2D;
  using System.Drawing.Imaging;
  using System.IO;
  
  public class ImagesMethods
  {
    public string ResizeAndGetNameOfNewImages(string fileName)
    {
      string extFn = Path.GetExtension(fileName);
      string withoutExtFn = Path.GetFileNameWithoutExtension(fileName);
      string pathFn = Path.GetDirectoryName(fileName);
      string newImageList = string.Empty;
      if ((pathFn != null) && (extFn == ".jpg"))
      {
        var newFn = pathFn + "\\" + withoutExtFn + "new" + extFn;
        newImageList = newFn;
        ////MyLog(newFn);

        ResizeImage(fileName, new Size(111, 111), newFn);
      }

      return newImageList;
    }

    public void ResizeImage(
      string fileName, 
      Size size,
      string newFn,
      bool preserveAspectRatio = true)
    {
      using (var bmpInput = Image.FromFile(fileName))
      {
        using (var bmpOutput = new Bitmap(bmpInput, size))
        {
          foreach (var id in bmpInput.PropertyIdList)
            bmpOutput.SetPropertyItem(bmpInput.GetPropertyItem(id));
          bmpOutput.SetResolution(300.0f, 300.0f);
          bmpOutput.Save(newFn, ImageFormat.Jpeg);
        }
      }
    }
  }
}
