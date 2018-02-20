namespace NewsPortal.BLL.Interfaces
{
    public interface IServiceCreator
    {
        IUserService CreateUserService(string connection);
        IFeederService CreateFeederService(string connection);
        INewsService CreateNewsService(string connection);
        ICategoryService CreateCategorieService(string connection);
    }
}
