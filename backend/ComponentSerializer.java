package org.example.electrostock.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.example.electrostock.entities.ComponentEntity;

import java.io.IOException;

public class ComponentSerializer extends JsonSerializer<ComponentEntity> {
    @Override
    public void serialize(ComponentEntity component, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeNumberField("id", component.getId());
        gen.writeStringField("name", component.getName());
        gen.writeStringField("description", component.getDescription());
        gen.writeStringField("stockStatus", component.getStockStatus());
        gen.writeStringField("category", component.getCategory());
        gen.writeNumberField("quantity", component.getQuantity());
        gen.writeEndObject();
    }
}