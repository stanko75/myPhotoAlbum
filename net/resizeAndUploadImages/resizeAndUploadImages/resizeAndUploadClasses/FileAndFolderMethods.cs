namespace ResizeAndUploadImages.ResizeAndUploadClasses
{
  using System;
  using System.Collections.Generic;
  using System.IO;

  public class FileAndFolderMethods
  {
    public List<string> GetListOfFoldersAndSubFolders(string dir)
    {
      var dirList = new List<string>();
      try
      {
        foreach (string d in Directory.GetDirectories(dir))
        {
          dirList.AddRange(Directory.GetFiles(d));
          GetListOfFoldersAndSubFolders(d);
        }
      }
      catch (Exception e)
      {
        ////MyLog(e.Message);
      }

      return dirList;
    }
  }
}
