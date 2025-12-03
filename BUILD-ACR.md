# Build dan Push ke Azure Container Registry

## Cara Manual

**PENTING**: Tambahkan `--build-arg NEXT_PUBLIC_API_HOST` saat build!

### Perintah yang Benar:

```bash
# 1. Build dengan environment variable
docker build \
  --build-arg NEXT_PUBLIC_API_HOST=https://api.example.com \
  -t recruitment-app:v5 .

# 2. Tag untuk Azure Container Registry
docker tag recruitment-app:v5 qubisaaicontainers.azurecr.io/recruitment-app-fe:v5

# 3. Login ke ACR (jika belum login)
az acr login --name qubisaaicontainers

# 4. Push ke Azure Container Registry
docker push qubisaaicontainers.azurecr.io/recruitment-app-fe:v5
```

### Perintah yang SALAH (tanpa build-arg):

```bash
# ❌ JANGAN seperti ini - NEXT_PUBLIC_API_HOST akan kosong!
docker build -t recruitment-app:v5 .
docker tag recruitment-app:v5 qubisaaicontainers.azurecr.io/recruitment-app-fe:v5
docker push qubisaaicontainers.azurecr.io/recruitment-app-fe:v5
```

## Menggunakan Script Helper

### Linux/Mac:

```bash
chmod +x build-and-push.sh
./build-and-push.sh v5 https://api.example.com
```

### Windows (PowerShell):

```powershell
.\build-and-push.ps1 -Version v5 -ApiHost https://api.example.com
```

## Catatan Penting

1. **`--build-arg NEXT_PUBLIC_API_HOST` HARUS ada** saat build, jika tidak URL API akan kosong
2. Pastikan sudah login ke Azure: `az login`
3. Pastikan sudah login ke ACR: `az acr login --name qubisaaicontainers`
4. Ganti `https://api.example.com` dengan URL API production Anda
