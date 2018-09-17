namespace ResizeAndUploadImages.ResizeAndUploadClasses
{
  using System;
  using System.Collections.Generic;
  using System.Diagnostics.CodeAnalysis;
  using System.IO;
  using System.Linq;
  using System.Net;
  using System.Reflection;
  
  public class FtpMethods
  {
    public void Upload(string filename, string ftpRootFolder, string webSite, string userName, string pass)
    {
      FileInfo fileInf = new FileInfo(filename);
      MyLog("Create FtpWebRequest object from the Uri provided");
      MyLog("ftp://" + webSite + ftpRootFolder + "//" + fileInf.Name);
      var reqFtp = (FtpWebRequest)WebRequest.Create(new Uri(
        "ftp://" + webSite + ftpRootFolder + "//" + fileInf.Name));

      MyLog("Provide the WebPermission Credentials");
      reqFtp.Credentials = new NetworkCredential(
        userName,
        pass);

      MyLog("By default KeepAlive is true, where the control connection is ");
      MyLog("not closed after a command is executed.");
      reqFtp.KeepAlive = false;

      MyLog("Specify the command to be executed.");

      reqFtp.Method = WebRequestMethods.Ftp.UploadFile;

      MyLog("Specify the data transfer type.");
      reqFtp.UseBinary = true;

      MyLog("Notify the server about the size of the uploaded file");
      reqFtp.ContentLength = fileInf.Length;

      MyLog("The buffer size is set to 2kb");
      const int buffLength = 2048;
      byte[] buff = new byte[buffLength];

      MyLog("Opens a file stream (System.IO.FileStream) to read ");
      MyLog("the file to be uploaded");
      FileStream fs = fileInf.OpenRead();

      try
      {
        MyLog("Stream to which the file to be upload is written");
        Stream strm = reqFtp.GetRequestStream();

        MyLog("Read from the file stream 2kb at a time");
        var contentLen = fs.Read(buff, 0, buffLength);

        MyLog("Till Stream content ends");
        while (contentLen != 0)
        {
          MyLog("Write Content from the file stream to the");
          MyLog("FTP Upload Stream");
          strm.Write(buff, 0, contentLen);
          contentLen = fs.Read(buff, 0, buffLength);
        }

        MyLog("Close the file stream and the Request Stream");
        strm.Close();
        fs.Close();
      }
      catch (Exception)
      {
        MyLog("Upload Error");
      }
    }
    
    public void CreateFld(string folderName, string webSite, string userName, string pass, out string myFtpPath)
    {
      List<string> result = folderName.Split('\\').ToList();
      string fullP = string.Empty;

      foreach (var myRes in result)
      {
        fullP = fullP + "//" + myRes;
        MyLog("Create FtpWebRequest object from the Uri provided");
        MyLog("ftp://" + webSite + fullP);
        var reqFtp = (FtpWebRequest)WebRequest.Create(new Uri(
          "ftp://" + webSite + fullP));

        MyLog("Provide the WebPermission Credentials");
        reqFtp.Credentials = new NetworkCredential(
          userName,
          pass);

        MyLog("By default KeepAlive is true, where the control connection is ");
        MyLog("not closed after a command is executed.");
        reqFtp.KeepAlive = false;

        MyLog("Specify the command to be executed.");

        reqFtp.Method = WebRequestMethods.Ftp.MakeDirectory;
        try
        {
          using (var resp = (FtpWebResponse)reqFtp.GetResponse())
          {
            MyLog(resp.StatusCode.ToString());
          }
        }
        catch (Exception e)
        {
          MyLog(e.Message);
        }
      }

      myFtpPath = fullP;
    }

    public void MyLog(string message)
    {
      message = message + Environment.NewLine;
      File.AppendAllText(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "myLog.txt"), message);
    }
  }
}
