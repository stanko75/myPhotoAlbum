namespace ResizeAndUploadImages
{
  using System;
  using System.Collections.Generic;
  using System.Configuration;
  using System.IO;
  using ResizeAndUploadClasses;

  class Program
  {
    private static readonly string WebSite = ConfigurationManager.AppSettings["webSite"];
    private static readonly string UserName = ConfigurationManager.AppSettings["userName"];
    private static readonly string Pass = ConfigurationManager.AppSettings["pass"];
    private static readonly string FtpRootFolder = ConfigurationManager.AppSettings["rootFolder"];
    private static readonly string ImagesFolder = ConfigurationManager.AppSettings["imagesFolder"];
    private static readonly string FileWithListOfImages = ConfigurationManager.AppSettings["fileWithListOfImages"];
    
    static void Main(string[] args)
    {
      List<string> listOfNewImages = ListOfResizedImages();

      CreateFtpFolderAndUpload(listOfNewImages);

      ////mu.DirSearch(@"G:\slike\");
    }

    private static List<string> ListOfResizedImages()
    {
      FileAndFolderMethods dirList = new FileAndFolderMethods();
      ImagesMethods im = new ImagesMethods();
      List<string> dls = new List<string>();

      if (Directory.GetDirectories(ImagesFolder).Length > 0)
      {
        dls = dirList.GetListOfFoldersAndSubFolders(ImagesFolder);
      }
      else
      {
        dls.AddRange(Directory.GetFiles(ImagesFolder));
      }

      List<string> listOfNewImages = new List<string>();

      ////list all images in folder and resize them
      foreach (var file in dls)
      {
        File.AppendAllText(FileWithListOfImages, file + Environment.NewLine);
        try
        {
          var dlsNew = im.ResizeAndGetNameOfNewImages(file);
          listOfNewImages.Add(dlsNew);
        }
        catch (Exception e)
        {
          File.AppendAllText(
            "c:\\ttt.txt",
            "Error: " + e.Message + Environment.NewLine + "In file:" + Environment.NewLine + file + Environment.NewLine);
        }
      }

      return listOfNewImages;
    }

    private static void CreateFtpFolderAndUpload(List<string> listOfNewImages)
    {
      FtpMethods fm = new FtpMethods();

      ////Create FTP folder and upload image
      foreach (var newImage in listOfNewImages)
      {
        try
        {
          string myFtpPath = string.Empty;
          string pathFn = Path.GetDirectoryName(newImage);
          if (pathFn != null)
          {
            string ftpPath = FtpRootFolder + pathFn.Substring(2, pathFn.Length - 2);

            fm.CreateFld(ftpPath, WebSite, UserName, Pass, out myFtpPath);
          }

          fm.Upload(newImage, myFtpPath, WebSite, UserName, Pass);
          File.Delete(newImage);
        }
        catch (Exception e)
        {
          File.AppendAllText(
            "c:\\ttt.txt", 
            "Error: " + e.Message + Environment.NewLine + "In file:" + Environment.NewLine + newImage + Environment.NewLine);
        }
      }
    }
  }
}