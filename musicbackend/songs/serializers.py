from rest_framework import serializers
from .models import Song

class SongSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = Song
        fields = '__all__'

    def get_file(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.file.url)