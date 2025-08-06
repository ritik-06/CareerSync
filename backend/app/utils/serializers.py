from bson import ObjectId

def serialize_mongo_document(doc):
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])
    return doc
