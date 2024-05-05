import json

def extract_body_from_whatsapp_template(components):
    """
        extracts the json object for the body from a list of json components
    """
    for component in components:

        if component.get('type') == "BODY":
            return component.get("text")
    return None

components = [{'type': 'HEADER', 'format': 'DOCUMENT', 'example': {'header_handle': ['https://scontent.whatsapp.net/v/t61.29466-34/389368984_1637331587003048_2292145599275960093_n.pdf?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=bX2Tssab1CIQ7kNvgFeVOnp&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIFCWdz97krGVNBtF6VAJFhougWfPbsVrRY1S3jJHCU_t&oe=665D6C7C']}}, {'text': 'Hi {{1}},\n\nThis is a friendly reminder about invoice #{{2}} for {{3}} which is due on {{4}}.\n\nFor your convenience, please make payment to this bank:\nBank: {{5}}\nAccount Number: {{6}}\n\nOnce transferred, please add the payment attachment for our reference.\nLet us know if you have any questions.\n\nThanks,\n{{7}}', 'type': 'BODY', 'example': {'body_text': [['John Doe', '12345', 'RM 500', '2024-04-22', 'CIMB Bank', '987654321', 'SEMIX SDN BHD']]}}, {'text': 'Powered by DebtCore', 'type': 'FOOTER'}]


t = extract_body_from_whatsapp_template(components)
print(t)