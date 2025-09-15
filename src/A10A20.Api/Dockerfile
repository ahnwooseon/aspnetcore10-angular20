# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /src

# Copy project file first for better layer caching
COPY ["src/A10A20.Api/A10A20.Api.csproj", "A10A20.Api/"]
COPY ["Directory.Packages.props", "/"]

# Restore dependencies
RUN dotnet restore "A10A20.Api/A10A20.Api.csproj"

# Copy source code
COPY ["src/A10A20.Api", "A10A20.Api"]

# Build and publish
RUN dotnet publish "A10A20.Api/A10A20.Api.csproj" -c Release -o /app/publish --verbosity minimal

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final

WORKDIR /app

# Copy published files
COPY --from=build /app/publish .

# Configure ASP.NET Core
# ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "A10A20.Api.dll"]
